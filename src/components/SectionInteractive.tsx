import React, { useEffect, useMemo, useState } from 'react';
import type { ForumComment, ForumRole, CommunityPost, SyncStatus } from '../types';
import {
  forumStore,
  randomAlias,
  relativeTime,
  validateContentSafety,
} from '../services/forumStorage';
import { FORUM_ROLES, SEED_SNAPSHOT, TOPICS } from '../data/campaignData';
import { Send, RefreshCw, Heart, MessageCircle, ShieldCheck, Sparkles } from 'lucide-react';

const STATUS_TEXT: Record<SyncStatus, string> = {
  realtime: 'Trực tuyến — bài đăng & lời động viên được đồng bộ tức thì cho cộng đồng',
  syncing: 'Đang đồng bộ dữ liệu...',
  local: 'Chế độ lưu cục bộ — bài viết vẫn được lưu an toàn, thử kết nối lại sau',
};

const DOT_COLOR: Record<SyncStatus, string> = {
  realtime: 'bg-sage',
  syncing: 'bg-ochre animate-pulse',
  local: 'bg-terra',
};

export const SectionInteractive: React.FC = () => {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [comments, setComments] = useState<Record<string, ForumComment[]>>({});
  const [status, setStatus] = useState<SyncStatus>('local');
  const [lastSync, setLastSync] = useState('');

  useEffect(() => {
    const teardown = forumStore.init(SEED_SNAPSHOT);
    const unsubscribe = forumStore.subscribe((snap, _source, st) => {
      setPosts([...snap.posts].sort((a, b) => b.createdAt - a.createdAt));
      setComments(snap.comments);
      setStatus(st);
      setLastSync(new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }));
    });
    return () => {
      unsubscribe();
      teardown();
    };
  }, []);

  // ---------------------------------------------------------- form state
  const [role, setRole] = useState<ForumRole>('Học sinh');
  const [alias, setAlias] = useState(() => randomAlias());
  const [topic, setTopic] = useState<string>(TOPICS[1]);
  const [content, setContent] = useState('');
  const [filter, setFilter] = useState('all');
  const [warning, setWarning] = useState('');
  const [posted, setPosted] = useState(false);
  const [openComments, setOpenComments] = useState<Record<string, boolean>>({});
  const [drafts, setDrafts] = useState<Record<string, string>>({});

  const showWarning = (msg: string) => {
    setWarning(msg);
    window.setTimeout(() => setWarning(''), 6500);
  };

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    const text = content.trim();
    const safety = validateContentSafety(text);
    if (!safety.isSafe) {
      showWarning(safety.reason || 'Nội dung chưa phù hợp.');
      return;
    }
    const post: CommunityPost = {
      id: `post-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      alias: alias.trim() || randomAlias(role),
      role,
      topic,
      content: text,
      createdAt: Date.now(),
      hugs: 0,
      commentsCount: 0,
    };
    forumStore.addPost(post);
    setContent('');
    setTopic(TOPICS[Math.floor(Math.random() * TOPICS.length)]);
    setPosted(true);
    window.setTimeout(() => setPosted(false), 5000);
  };

  const handleSubmitComment = (postId: string) => {
    const text = (drafts[postId] || '').trim();
    const safety = validateContentSafety(text);
    if (!safety.isSafe) {
      showWarning(safety.reason || 'Bình luận chưa phù hợp.');
      return;
    }
    const comment: ForumComment = {
      id: `cmt-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      postId,
      alias: alias.trim() || randomAlias(role),
      role,
      content: text,
      createdAt: Date.now(),
    };
    forumStore.addComment(postId, comment);
    setDrafts((d) => ({ ...d, [postId]: '' }));
  };

  const filtered = useMemo(
    () => (filter === 'all' ? posts : posts.filter((p) => p.topic === filter)),
    [posts, filter],
  );

  const resetAlias = () => setAlias(randomAlias(role));

  return (
    <div className="space-y-12 pt-10 sm:pt-14">
      <header className="space-y-4 max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-terra">
          Góc tương tác — Không gian an toàn
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-ink tracking-tight leading-tight">
          Hộp thư Đồng cảm:{' '}
          <span className="font-editorial italic font-medium">nơi những câu chuyện được nghe trọn vẹn.</span>
        </h1>
        <p className="text-[15px] text-muted leading-relaxed">
          Chia sẻ bằng bút danh ẩn danh — danh tính không bao giờ được yêu cầu.
          Mỗi lời động viên đều được lưu và hiển thị tức thì cho mọi người trong
          không gian an toàn, được lọc bằng bộ kiểm duyệt ngôn từ.
        </p>
      </header>

      {/* ------------------------- status bar --------------------------- */}
      <div className="border border-line bg-white rounded-md px-4 sm:px-5 py-3 flex flex-wrap items-center justify-between gap-3">
        <p className="flex items-center gap-2.5 text-[13px] text-ink">
          <span className={`relative flex w-2.5 h-2.5`}>
            {status === 'realtime' && <span className="absolute inline-flex h-full w-full rounded-full bg-sage/40 animate-ping" aria-hidden />}
            <span className={`relative inline-flex w-2.5 h-2.5 rounded-full ${DOT_COLOR[status]}`} aria-hidden />
          </span>
          <span>
            <strong className="font-bold">{status === 'realtime' ? '● Trực tuyến' : status === 'syncing' ? '○ Đang đồng bộ' : '○ Cục bộ'}</strong>{' '}
            — {STATUS_TEXT[status]}
          </span>
        </p>
        <div className="flex items-center gap-3 text-[11px] text-muted">
          {lastSync && <span>Cập nhật: {lastSync}</span>}
          <button
            onClick={() => forumStore.pullCloud()}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm border border-line hover:border-ink/40 transition-colors"
          >
            <RefreshCw className="w-3 h-3" aria-hidden />
            Làm mới
          </button>
        </div>
      </div>

      {warning && (
        <div className="border border-ochre bg-[#D99B26]/10 rounded-md px-4 py-3 text-[13px] text-ink/85 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-ochre mt-0.5 shrink-0" aria-hidden />
          <span>{warning}</span>
        </div>
      )}
      {posted && (
        <div className="border border-sage bg-[#2B6653]/10 rounded-md px-4 py-3 text-[13px] text-ink/85 flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-sage mt-0.5 shrink-0" aria-hidden />
          <span>Bài chia sẻ của bạn đã được lưu và hiển thị với cộng đồng. Cảm ơn sự dũng cảm đó.</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* --------------------------- form --------------------------- */}
        <form onSubmit={handleSubmitPost} className="lg:col-span-5 border border-line bg-white rounded-md p-6 sm:p-7 space-y-5 lg:sticky lg:top-24">
          <p className="font-bold text-ink text-[15px]">Chia sẻ câu chuyện của bạn</p>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted mb-2">Bạn đang đóng vai</p>
            <div className="grid grid-cols-2 gap-2">
              {FORUM_ROLES.map((r) => (
                <button
                  type="button"
                  key={r}
                  onClick={() => setRole(r)}
                  className={`py-2 px-3 rounded-sm border text-xs font-semibold transition-colors ${
                    role === r
                      ? 'border-navy bg-navy text-white'
                      : 'border-line text-muted hover:text-ink hover:border-ink/30'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="alias" className="block text-[11px] font-bold uppercase tracking-[0.14em] text-muted mb-1.5">
              Bút danh ẩn danh
            </label>
            <div className="flex gap-2">
              <input
                id="alias"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                placeholder="Ví dụ: Cây Xương Rồng Nhỏ"
                className="flex-1 px-3 py-2 border border-line rounded-sm focus:outline-none focus:border-terra text-[13px] bg-paper"
              />
              <button
                type="button"
                onClick={resetAlias}
                title="Tạo bút danh ngẫu nhiên"
                className="px-2.5 border border-line rounded-sm hover:border-terra hover:text-terra transition-colors shrink-0"
                aria-label="Tạo bút danh ngẫu nhiên"
              >
                <RefreshCw className="w-3.5 h-3.5" aria-hidden />
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="topic" className="block text-[11px] font-bold uppercase tracking-[0.14em] text-muted mb-1.5">
              Chủ đề
            </label>
            <select
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-3 py-2 border border-line rounded-sm focus:outline-none focus:border-terra text-[13px] bg-paper"
            >
              {TOPICS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="content" className="block text-[11px] font-bold uppercase tracking-[0.14em] text-muted mb-1.5">
              Câu chuyện / tâm sự của bạn
            </label>
            <textarea
              id="content"
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Hãy kể những gì khiến bạn khó chịu gần đây, hoặc câu chuyện vượt qua bạn muốn kể lại cho ai đó..."
              className="w-full px-3 py-2.5 border border-line rounded-sm focus:outline-none focus:border-terra text-[13px] leading-relaxed bg-paper resize-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 bg-navy text-white text-sm font-semibold py-3 rounded-sm hover:bg-[#0f1a29] transition-colors"
          >
            <Send className="w-4 h-4" aria-hidden />
            Đăng chia sẻ
          </button>
          <p className="text-[11px] text-muted/80 leading-relaxed">
            Bài đăng sẽ xuất hiện ngay ở đầu danh sách. Danh tính theo Điều 21
            Luật Trẻ em 2016 được bảo vệ tuyệt đối — chỉ bạn bút danh của bạn.
          </p>
        </form>

        {/* ------------------------- post list ------------------------- */}
        <div className="lg:col-span-7 space-y-5">
          <div className="flex flex-wrap gap-2">
            {[{ k: 'all', l: 'Tất cả' }, ...TOPICS.map((t) => ({ k: t, l: t }))].map((f) => (
              <button
                key={f.k}
                onClick={() => setFilter(f.k)}
                className={`px-3 py-1.5 rounded-sm border text-xs font-semibold transition-colors ${
                  filter === f.k
                    ? 'border-terra text-terra bg-terra/5'
                    : 'border-line text-muted hover:text-ink hover:border-ink/30 bg-white'
                }`}
              >
                {f.l}
              </button>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-[13px] text-muted border border-dashed border-line rounded-md p-6 text-center">
              Chưa có bài viết trong chủ đề này. Hãy là người đầu tiên chia sẻ.
            </p>
          )}

          {filtered.map((post) => {
            const list = comments[post.id] || [];
            const open = openComments[post.id] || false;
            return (
              <article key={post.id} className="border border-line bg-white rounded-md">
                <div className="p-6 space-y-3">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px]">
                    <span className="font-bold text-ink text-[13px]">{post.alias}</span>
                    <span className="uppercase tracking-[0.12em] text-muted">{post.role}</span>
                    <span className="text-terra font-bold">{post.topic}</span>
                    <span className="text-muted/70">{relativeTime(post.createdAt)}</span>
                  </div>
                  <p className="text-[14px] text-ink/90 leading-relaxed whitespace-pre-line">{post.content}</p>
                </div>

                <div className="px-6 py-3 border-y border-line/70 flex items-center gap-3 text-xs">
                  <button
                    onClick={() => forumStore.sendHug(post.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-line text-muted hover:border-terra hover:text-terra transition-colors"
                    aria-label="Gửi lời đồng cảm"
                  >
                    <Heart className="w-3.5 h-3.5" aria-hidden />
                    Gửi cái ôm <strong className="font-bold">{post.hugs}</strong>
                  </button>
                  <button
                    onClick={() => setOpenComments((o) => ({ ...o, [post.id]: !o[post.id] }))}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-line text-muted hover:border-sage hover:text-sage transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" aria-hidden />
                    {list.length} lời động viên
                  </button>
                </div>

                {open && (
                  <div className="p-6 bg-sand/40 divide-y divide-line/60">
                    {list.length === 0 && (
                      <p className="text-[12px] text-muted/70 pb-3">Hãy là người đầu tiên gửi lời động viên cho bài này.</p>
                    )}
                    {list.map((c) => (
                      <div key={c.id} className="py-3 space-y-1">
                        <p className="text-[11px] text-muted">
                          <strong className="text-ink">{c.alias}</strong>
                          <span className="uppercase tracking-wider"> · {c.role}</span>
                          <span> · {relativeTime(c.createdAt)}</span>
                        </p>
                        <p className="text-[13px] text-ink/85 leading-relaxed">{c.content}</p>
                      </div>
                    ))}
                    <div className="pt-4 flex flex-col sm:flex-row gap-2">
                      <input
                        value={drafts[post.id] || ''}
                        onChange={(e) => setDrafts((d) => ({ ...d, [post.id]: e.target.value }))}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleSubmitComment(post.id);
                          }
                        }}
                        placeholder={`Gửi lời động viên với vai ${role.toLowerCase()}...`}
                        className="flex-1 px-3 py-2 border border-line rounded-sm focus:outline-none focus:border-sage text-[13px] bg-white"
                      />
                      <button
                        onClick={() => handleSubmitComment(post.id)}
                        className="px-4 py-2 bg-sage text-white text-xs font-bold rounded-sm hover:bg-[#22503f] transition-colors shrink-0"
                      >
                        Gửi lời động viên
                      </button>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};
