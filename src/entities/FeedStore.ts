import { create } from "zustand";

interface Like {
  id: number;
  user_id: number;
  post_id: number;
  type: string;
  createdAt: string;
}

interface FeedItem {
  id: number;
  title: string;
  content: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    nickname: string;
    email: string;
    type: string;
    created_at: string;
    updated_at: string;
  };
  delYN: string;
  file_path: string | null;
  isLiked: boolean | string;
  like: Like[];
  likeCount: number;
  user_id: number;
}

interface FeedStore {
  feed: FeedItem[];
  setFeed: (newFeed: FeedItem[]) => void;
  updateLikeState: (
    postId: number,
    isLiked: boolean | string,
    likeCount: number
  ) => void;
}

export const useFeedStore = create<FeedStore>((set) => ({
  feed: [],
  setFeed: (newFeed) => set(() => ({ feed: newFeed })),
  updateLikeState: (postId, isLiked, likeCount) =>
    set((state) => ({
      feed: state.feed.map((item) =>
        item.id === postId ? { ...item, isLiked, likeCount } : item
      ),
    })),
}));
