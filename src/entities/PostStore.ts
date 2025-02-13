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

// 대댓글 추가
const addCommentTree = (
  comments: Comment[],
  newComment: Comment
): Comment[] => {
  return comments.map((comment) => {
    if (comment.id === newComment.parent_id) {
      // 부모 댓글을 찾았을 때 새 댓글 추가
      return {
        ...comment,
        children: [...(comment.children || []), newComment],
      };
    }

    if (comment.children && comment.children.length > 0) {
      // 자식 댓글이 있으면 재귀적으로 탐색
      return {
        ...comment,
        children: addCommentTree(comment.children, newComment),
      };
    }

    return comment;
  });
};
//대댓글 수정
const updateCommentTree = (
  comments: Comment[],
  updatedComment: { id: number; content: string }
): Comment[] => {
  return comments.map((comment) => {
    if (comment.id === updatedComment.id) {
      return { ...comment, content: updatedComment.content };
    }

    if (comment.children && comment.children.length > 0) {
      return {
        ...comment,
        children: updateCommentTree(comment.children, updatedComment),
      };
    }

    return comment;
  });
};
//대댓글 삭제
export const removeCommentWithChildren = (
  comments: Comment[],
  commentId: number
): Comment[] => {
  return comments
    .filter((comment) => comment.id !== commentId) // 삭제할 댓글 제외
    .map((comment) => ({
      ...comment,
      children: comment.children
        ? removeCommentWithChildren(comment.children, commentId)
        : [],
    }));
};
//대댓글 좋아요
const updateNestedCommentLikeState = (
  comments: Comment[],
  commentId: number,
  isLiked: string,
  likeCount: number
): Comment[] => {
  return comments.map((comment) => {
    if (comment.id === commentId) {
      return { ...comment, isLiked, likeCount };
    }

    if (comment.children && comment.children.length > 0) {
      return {
        ...comment,
        children: updateNestedCommentLikeState(
          comment.children,
          commentId,
          isLiked,
          likeCount
        ),
      };
    }

    return comment;
  });
};

export const usePostStore = create<PostStore>((set) => ({
  post: null,
  setPost: (post) =>
    set((state) => ({
      post: typeof post === "function" ? post(state.post) : post,
    })),
  clearPost: () => set(() => ({ post: null })),
  //게시물 좋아요
  updatePostLikeState: (isLiked, likeCount) =>
    set((state) => ({
      post: state.post ? { ...state.post, isLiked, likeCount } : null,
    })),
  //댓글 좋아요
  updateCommentLikeState: (commentId, isLiked, likeCount) =>
    set((state) => {
      if (!state.post) return state;

      const updatedComments = updateNestedCommentLikeState(
        state.post.comment,
        commentId,
        isLiked,
        likeCount
      );

      return {
        post: { ...state.post, comment: updatedComments },
      };
    }),

  //대댓글 추가
  addNestedComment: (newComment: Comment) =>
    set((state) => {
      if (!state.post) return state;

      const updatedComments = addCommentTree(
        [...state.post.comment],
        newComment
      ); // 깊은 복사
      return {
        post: { ...state.post, comment: updatedComments },
      };
    }),

  //대댓글 수정
  updateNestedComment: (updatedComment: { id: number; content: string }) =>
    set((state) => {
      if (!state.post) return state;
      const updatedComments = updateCommentTree(
        state.post.comment,
        updatedComment
      );
      return {
        post: { ...state.post, comment: updatedComments },
      };
    }),
}));
