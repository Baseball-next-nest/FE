"use client";
import { FC, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { usePostStore } from "@/entities/PostStore";
import { useEditorStore } from "@/entities/EditorStore";
import dynamic from "next/dynamic";
import { CommentsInput } from "../input/CommentsInput";
import { RecursiveComment } from "./RecursiveComments";
import { createComments } from "@/app/api/api";
import { SortBySelect } from "../select-box/SortBySelect";
import { useModalStore } from "@/entities/ModalStore";

const TextEditor = dynamic(() => import("@/features/select-box/TextEditor"), {
  ssr: false,
});

interface CommentsProps {
  postId: number;
  session: any;
  ScrollRef: any;
  user?: any;
}

export const Comments: FC<CommentsProps> = ({
  postId,
  session,
  ScrollRef,
  user,
}) => {
  const { content, setContent } = useEditorStore();
  const { post, setPost, updateNestedComment } = usePostStore();
  const [isCommentClicked, setIsCommentClick] = useState(false);
  const [editState, setEditState] = useState<{ [key: number]: boolean }>({});
  const [replyState, setReplyState] = useState<{ [key: number]: boolean }>({});
  const replyRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const { register, reset, handleSubmit, formState } = useForm();
  const { openLoginModal } = useModalStore();
  const onCommentClick = () => {
    if (!user) {
      openLoginModal();
      return;
    }

    setIsCommentClick(true);
  };

  const onReplyClick = (commentId: number) => {
    setReplyState((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
    replyRefs.current[commentId]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const onEditClick = (commentId: number) => {
    setEditState((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  const onEditSuccess = (updatedComment: { id: number; content: string }) => {
    updateNestedComment(updatedComment);
  };

  const onSubmit = async () => {
    if (content === "") return;
    const newComment = {
      content,
      post_id: Number(postId),
      user_id: Number(session.user.id),
    };

    try {
      const createdComment = await createComments(newComment);
      if (post)
        setPost({ ...post, comment: [createdComment, ...post.comment] });
      reset({ content: "" });
      setContent("");
      setIsCommentClick(false);
    } catch (err) {
      alert("댓글 작성 실패.");
      console.error("Error submitting comment:", err);
    }
  };
  const handleSortChange = (sortedData: any[]) => {
    setPost({ ...post, comment: [...sortedData] });
    console.log(sortedData);
  };
  return (
    <>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="relative w-full flex flex-col items-center justify-center mt-8">
          {isCommentClicked ? (
            <TextEditor
              value={content}
              onChange={setContent}
              className="w-full !rounded-3xl"
            />
          ) : (
            <CommentsInput
              className="w-full py-3 focus:border-gray-700"
              onClick={onCommentClick}
              placeholder={
                user
                  ? `${user}님, 의견을 공유해보세요!`
                  : "의견을 공유해보세요!"
              }
            />
          )}
          {isCommentClicked && (
            <div className="w-11/12 flex items-center justify-end gap-2 mt-4">
              <button
                className="px-3.5 py-1.5 text-xs text-gray-700 rounded hover:bg-gray-200"
                onClick={() => setIsCommentClick(false)}
              >
                취소
              </button>
              <button
                className="px-3.5 py-1.5 text-xs rounded bg-blue-200 text-gray-700"
                type="submit"
              >
                등록
              </button>
            </div>
          )}
        </div>
        <div className="flex">
          <SortBySelect
            userId={session?.user?.id}
            postId={postId}
            onSortChange={handleSortChange}
          />
        </div>
      </form>

      {post?.comment?.length > 0 ? (
        post.comment.map((cmt: any, index: number) => (
          <RecursiveComment
            key={cmt.id}
            cmtLength={post?.comment.length}
            post_id={post?.id}
            comment={cmt}
            index={index}
            onReplyClick={onReplyClick}
            onEditClick={onEditClick}
            editState={editState}
            setReplyState={setReplyState}
            replyState={replyState}
            onEditSuccess={onEditSuccess}
            replyRefs={replyRefs}
            session={session}
          />
        ))
      ) : (
        <p className="mt-4 text-gray-500 text-sm">첫 번째 댓글을 남겨보세요!</p>
      )}
    </>
  );
};
