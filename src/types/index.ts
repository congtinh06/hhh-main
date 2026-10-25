export type TabType =
  | 'home'
  | 'understand'
  | 'students'
  | 'parents'
  | 'interactive'
  | 'support';

export type ForumRole = 'Học sinh' | 'Người chứng kiến' | 'Phụ huynh' | 'Giáo viên';

export interface CommunityPost {
  id: string;
  alias: string;
  role: ForumRole;
  topic: string;
  content: string;
  createdAt: number;
  hugs: number;
  commentsCount: number;
}

export interface ForumComment {
  id: string;
  postId: string;
  alias: string;
  role: ForumRole;
  content: string;
  createdAt: number;
}

export interface ForumSnapshot {
  posts: CommunityPost[];
  comments: Record<string, ForumComment[]>;
}

export type SyncStatus = 'realtime' | 'syncing' | 'local';

export type SyncSource = 'cloud' | 'broadcast' | 'storage' | 'poll' | 'bootstrap';
