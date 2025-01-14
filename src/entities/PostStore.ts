import { create } from "zustand";

interface PostDetails {
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

interface PostStore {
  post: PostDetails | null;
  setPost: (post: PostDetails) => void;
  clearPost: () => void;
  updatePostLikeState: (isLiked: boolean | string, likeCount: number) => void;
}

export const usePostStore = create<PostStore>((set) => ({
  post: null,
  setPost: (post) => set(() => ({ post })),
  clearPost: () => set(() => ({ post: null })),
  updatePostLikeState: (isLiked, likeCount) =>
    set((state) => ({
      post: state.post ? { ...state.post, isLiked, likeCount } : null,
    })),
}));
