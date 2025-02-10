import { create } from "zustand";
interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    nickname: string;
  };
  like: Like[];
  likeCount: number;
  isLiked: boolean | string;
}

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
  comment: Comment[];
  [key: string]: any;
  delYN: string;
  file_path: string | null;
  isLiked: boolean | string;
  like: Like[];
  likeCount: number;
  user_id: number;
}

interface PostStore {
  post: PostDetails | null;
  setPost: (
    post: PostDetails | ((prevPost: PostDetails | null) => PostDetails | null)
  ) => void;
  clearPost: () => void;
  updatePostLikeState: (isLiked: boolean | string, likeCount: number) => void;
  updateCommentLikeState: (
    commentId: number,
    isLiked: boolean | string,
    likeCount: number
  ) => void;
}

export const usePostStore = create<PostStore>((set) => ({
  post: null,
  setPost: (post) =>
    set((state) => ({
      post: typeof post === "function" ? post(state.post) : post,
    })),
  clearPost: () => set(() => ({ post: null })),
  updatePostLikeState: (isLiked, likeCount) =>
    set((state) => ({
      post: state.post ? { ...state.post, isLiked, likeCount } : null,
    })),
  updateCommentLikeState: (commentId, isLiked, likeCount) =>
    set((state) => {
      if (!state.post) return state;

      const updatedComments = state.post.comment.map((comment) =>
        comment.id === commentId ? { ...comment, isLiked, likeCount } : comment
      );

      return {
        post: { ...state.post, comment: updatedComments },
      };
    }),
}));
