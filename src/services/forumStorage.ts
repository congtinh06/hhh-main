import type {
  CommunityPost,
  ForumComment,
  ForumSnapshot,
  SyncSource,
  SyncStatus,
} from '../types';

const LS_POSTS_KEY = 'dil_forum_posts_v4';
const LS_COMMENTS_KEY = 'dil_forum_comments_v4';
const CHANNEL_NAME = 'dung-im-lang-forum';

/** Public real-time JSON relay (works without configuration). */
const RELAY_URL = 'https://extendsclass.com/api/json-storage/bin/fbaceec';

/** Optional Supabase configuration (single-table snapshot sync). */
const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.trim();
const supabaseKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined)?.trim();
const supabaseConfigured = Boolean(supabaseUrl && supabaseKey);

export interface ForumListener {
  (snapshot: ForumSnapshot, source: SyncSource, status: SyncStatus): void;
}

class ForumStore {
  private listeners = new Set<ForumListener>();
  private channel: BroadcastChannel | null = null;
  private pollTimer: number | null = null;
  private cloudTimer: number | null = null;
  private lastBroadcastAt = 0;
  private pushTimer: number | null = null;
  private cloudAvailable = true;

  posts: CommunityPost[] = [];
  comments: Record<string, ForumComment[]> = {};
  status: SyncStatus = 'local';

  // ---------------------------------------------------------------- bootstrap

  init(seed: ForumSnapshot) {
    this.posts = seed.posts;
    this.comments = seed.comments;
    this.hydrateFromLocal(seed);
    this.emit('bootstrap');

    if (typeof BroadcastChannel !== 'undefined') {
      this.channel = new BroadcastChannel(CHANNEL_NAME);
      this.channel.onmessage = (ev) => {
        const msg = ev.data as { kind: string; snapshot?: ForumSnapshot };
        if (msg?.kind === 'sync' && msg.snapshot) {
          this.mergeIntoState(msg.snapshot, 'broadcast');
        }
      };
    }

    // StorageEvent: fired in every *other* window when this origin writes
    window.addEventListener('storage', this.onStorageEvent);

    // Fast local poll as safety net (browsers without StorageEvent ordering)
    this.pollTimer = window.setInterval(() => {
      this.hydrateFromLocal(seed, 'poll');
    }, 1000);

    // Cloud sync: pull now, then reconcile every 12s
    if (navigator.onLine !== false) {
      this.pullCloud();
      this.cloudTimer = window.setInterval(() => this.pullCloud(), 12000);
    }
    window.addEventListener('online', this.handleOnline);

    return () => this.teardown(seed);
  }

  private teardown(seed: ForumSnapshot) {
    window.removeEventListener('storage', this.onStorageEvent);
    window.removeEventListener('online', this.handleOnline);
    if (this.pollTimer) window.clearInterval(this.pollTimer);
    if (this.cloudTimer) window.clearInterval(this.cloudTimer);
    if (this.channel) this.channel.close();
    this.channel = null;
    void seed;
  }

  private handleOnline = () => {
    this.cloudAvailable = true;
    this.pullCloud();
  };

  subscribe(fn: ForumListener) {
    this.listeners.add(fn);
    fn(this.snapshot(), 'bootstrap', this.status);
    return () => {
      this.listeners.delete(fn);
    };
  }

  snapshot(): ForumSnapshot {
    return { posts: this.posts, comments: this.comments };
  }

  // ---------------------------------------------------------------- mutation

  addPost(post: CommunityPost) {
    this.posts = [post, ...this.posts];
    this.persistLocal();
    this.broadcast();
    this.scheduleCloudPush();
  }

  addComment(postId: string, comment: ForumComment) {
    this.comments = {
      ...this.comments,
      [postId]: [...(this.comments[postId] || []), comment],
    };
    this.refreshCommentCounts([postId]);
    this.persistLocal();
    this.broadcast();
    this.scheduleCloudPush();
  }

  sendHug(postId: string) {
    this.posts = this.posts.map((p) =>
      p.id === postId ? { ...p, hugs: p.hugs + 1 } : p,
    );
    this.persistLocal();
    this.broadcast();
    this.scheduleCloudPush();
  }

  refreshCommentCounts(postIds?: string[]) {
    this.posts = this.posts.map((p) => {
      if (postIds && !postIds.includes(p.id)) return p;
      const list = this.comments[p.id] || [];
      return { ...p, commentsCount: list.length };
    });
  }

  // ---------------------------------------------------------------- emit

  private emit(source: SyncSource) {
    const status = this.status;
    const snap = this.snapshot();
    this.listeners.forEach((fn) => fn(snap, source, status));
  }

  // ---------------------------------------------------------------- local layer

  private hydrateFromLocal(seed: ForumSnapshot, source: SyncSource = 'bootstrap') {
    let changed = false;
    try {
      const rawPosts = localStorage.getItem(LS_POSTS_KEY);
      const rawComments = localStorage.getItem(LS_COMMENTS_KEY);
      if (rawPosts) {
        const parsed = JSON.parse(rawPosts);
        if (Array.isArray(parsed) && parsed.length > this.posts.length) {
          changed = this.mergeIntoState({ posts: parsed, comments: this.comments }, source) || changed;
        }
      }
      if (rawComments) {
        const parsed = JSON.parse(rawComments);
        if (parsed && typeof parsed === 'object') {
          changed = this.mergeIntoState({ posts: this.posts, comments: parsed }, source) || changed;
        }
      }
    } catch {
      /* corrupted cache — keep current state */
    }
    if (changed) this.persistLocal();
    return changed;
  }

  private persistLocal() {
    try {
      localStorage.setItem(LS_POSTS_KEY, JSON.stringify(this.posts));
      localStorage.setItem(LS_COMMENTS_KEY, JSON.stringify(this.comments));
    } catch {
      /* quota — ignore */
    }
  }

  private onStorageEvent = (ev: StorageEvent) => {
    if (ev.key !== LS_POSTS_KEY && ev.key !== LS_COMMENTS_KEY) return;
    this.hydrateFromLocal({ posts: this.posts, comments: this.comments }, 'storage');
  };

  // ---------------------------------------------------------------- cross-tab layer

  private broadcast() {
    const now = Date.now();
    this.lastBroadcastAt = now;
    try {
      if (this.channel) {
        this.channel.postMessage({ kind: 'sync', snapshot: this.snapshot() });
      }
    } catch {
      /* channel closed */
    }
  }

  private mergeIntoState(incoming: ForumSnapshot, source: SyncSource): boolean {
    const byId = new Map(this.posts.map((p) => [p.id, p]));
    let postsChanged = false;
    for (const p of incoming.posts) {
      const existing = byId.get(p.id);
      if (!existing) {
        byId.set(p.id, p);
        postsChanged = true;
      } else if (p.hugs !== existing.hugs || p.commentsCount !== existing.commentsCount) {
        byId.set(p.id, { ...existing, hugs: p.hugs, commentsCount: p.commentsCount });
        postsChanged = true;
      }
    }
    const nextPosts = [...byId.values()].sort((a, b) => b.createdAt - a.createdAt);

    const nextComments: Record<string, ForumComment[]> = { ...this.comments };
    let commentsChanged = false;
    for (const [postId, list] of Object.entries(incoming.comments || {})) {
      if (!Array.isArray(list)) continue;
      const seen = new Set((nextComments[postId] || []).map((c) => c.id));
      const merged = [...(nextComments[postId] || [])];
      for (const c of list) {
        if (!seen.has(c.id)) {
          merged.push(c);
          commentsChanged = true;
        }
      }
      if (commentsChanged) {
        merged.sort((a, b) => a.createdAt - b.createdAt);
        nextComments[postId] = merged;
      }
    }

    if (!postsChanged && !commentsChanged) return false;

    this.posts = nextPosts;
    this.comments = nextComments;
    this.setStatus('realtime');
    this.emit(source);
    return true;
  }

  private setStatus(status: SyncStatus) {
    this.status = status;
  }

  // ---------------------------------------------------------------- cloud layer

  async pullCloud() {
    if (!this.cloudAvailable) return;
    try {
      let remote: ForumSnapshot | null = null;
      if (supabaseConfigured) {
        const res = await fetch(
          `${supabaseUrl}/rest/v1/forum_snapshot?select=data&limit=1`,
          {
            headers: {
              apikey: supabaseKey!,
              Authorization: `Bearer ${supabaseKey}`,
            },
          },
        );
        if (res.ok) {
          const rows = await res.json();
          if (Array.isArray(rows) && rows.length > 0 && rows[0]?.data) {
            remote = rows[0].data as ForumSnapshot;
          }
        } else {
          this.cloudAvailable = false;
        }
      } else {
        const res = await fetch(`${RELAY_URL}?t=${Date.now()}`);
        if (res.ok) {
          const data = await res.json();
          if (data && Array.isArray(data.posts)) {
            remote = data as ForumSnapshot;
          }
        } else {
          this.cloudAvailable = false;
        }
      }

      if (remote) {
        this.setStatus('realtime');
        this.mergeIntoState(remote, 'cloud');
        this.emit('cloud');
      }
    } catch {
      this.cloudAvailable = false;
      this.setStatus('local');
      this.emit('cloud');
    }
  }

  private scheduleCloudPush() {
    if (this.pushTimer) window.clearTimeout(this.pushTimer);
    this.pushTimer = window.setTimeout(() => this.pushCloud(), 600);
  }

  private async pushCloud() {
    if (!this.cloudAvailable) return;
    try {
      const body = JSON.stringify({ posts: this.posts, comments: this.comments });
      if (supabaseConfigured) {
        await fetch(`${supabaseUrl}/rest/v1/forum_snapshot`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: supabaseKey!,
            Authorization: `Bearer ${supabaseKey}`,
            Prefer: 'resolution=merge-duplicates',
          },
          body: JSON.stringify({ id: 'main', data: { posts: this.posts, comments: this.comments } }),
        });
      } else {
        const res = await fetch(RELAY_URL, {
          method: 'PUT',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body,
        });
        if (!res.ok) this.cloudAvailable = false;
      }
      this.setStatus(this.cloudAvailable ? 'realtime' : 'local');
      this.emit('cloud');
    } catch {
      this.cloudAvailable = false;
      this.setStatus('local');
      this.emit('cloud');
    }
  }
}

export const forumStore = new ForumStore();

// ---------------------------------------------------------------- helpers

const ALIAS_POOL = [
  'Cây Xương Rồng Nhỏ',
  'Người Lắng Nghe',
  'Ánh Dương Nhỏ',
  'Cô Bé Bút Chì',
  'Ngôi Sao May Mắn',
  'Giọng Nói Thầm',
  'Mầm Xanh',
  'Vệ Binh Vô Danh',
  'Bông Hoa Kiên Cường',
  'Bạn Học Lớp 11',
  'Notebook Nhỏ',
  'Chú Gió Nhẹ',
];

export function randomAlias(seedRole?: string): string {
  if (Math.random() < 0.25 && seedRole === 'Phụ huynh') {
    return 'Một người mẹ lặng thầm';
  }
  const pick = ALIAS_POOL[Math.floor(Math.random() * ALIAS_POOL.length)];
  void seedRole;
  return pick;
}

export function relativeTime(epoch: number): string {
  const diff = Date.now() - epoch;
  if (diff < 60_000) return 'Vừa xong';
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)} phút trước`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)} giờ trước`;
  const days = Math.floor(diff / 86_400_000);
  if (days < 30) return `${days} ngày trước`;
  return new Date(epoch).toLocaleDateString('vi-VN');
}

// ---------------------------------------------------------------- moderation

const BLOCKED_WORDS = [
  'đm', 'dm', 'đmm', 'dmm', 'vcl', 'cl', 'cc', 'mẹ mày', 'me may', 'má mày',
  'bố mày', 'bo may', 'thằng chó', 'con chó', 'đồ ngu', 'ngu vcl', 'óc chó',
  'con điếm', 'đĩ', 'đê tiện', 'chết đi', 'chet di', 'tự tử đi', 'đánh chết',
  'đồ rác rưởi', 'rac ruoi', 'bitch', 'fuck', 'shit', 'asshole', 'idiot',
  'cút đi', 'địt', 'm di', 'm máy',
];

export interface ModerationResult {
  isSafe: boolean;
  reason?: string;
}

export function validateContentSafety(text: string): ModerationResult {
  if (!text || text.trim().length === 0) {
    return { isSafe: false, reason: 'Nội dung không được để trống.' };
  }
  const normalized = text
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=_`~()\-?]/g, ' ')
    .replace(/\s+/g, ' ');

  for (const word of BLOCKED_WORDS) {
    const pattern = word.startsWith('đ') || word.startsWith('d')
      ? new RegExp(`(^|\\s)${word}(\\s|$)`, 'i')
      : null;
    if (pattern ? pattern.test(normalized) : normalized.includes(word)) {
      return {
        isSafe: false,
        reason:
          'Nội dung chứa từ ngữ chưa phù hợp với không gian an toàn của học đường. Hộp thư Đồng cảm chỉ nhận những chia sẻ, lời động viên và gợi ý mang tính xây dựng.',
      };
    }
  }
  return { isSafe: true };
}
