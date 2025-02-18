"use client";

import { FC, useMemo, useState } from "react";
import clsx from "clsx";
import { CommentsActionRows } from "../rows/CommentsActionRows";
import { EditComments } from "./EditConments";
import { getRelativeTime } from "../func/date";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { createComments } from "@/app/api/api";
import { usePostStore } from "@/entities/PostStore";
const TextEditor = dynamic(() => import("@/features/select-box/TextEditor"), {
  ssr: false,
});

interface RecursiveCommentProps {
  comment: any;
  depth?: number;
  onReplyClick: (commentId: number) => void;
  onEditClick: (commentId: number) => void;
  setReplyState: React.Dispatch<
    React.SetStateAction<{ [key: number]: boolean }>
  >;
  editState: { [key: number]: boolean };
  replyState: { [key: number]: boolean };
  onEditSuccess: (updatedComment: { id: number; content: string }) => void;
  replyRefs: React.MutableRefObject<{ [key: number]: HTMLDivElement | null }>;
  session: any;
  index: number;
  cmtLength: number;
  post_id: number;
}

export const RecursiveComment: FC<RecursiveCommentProps> = ({
  comment,
  depth = 0,
  onReplyClick,
  onEditClick,
  editState,
  replyState,
  setReplyState,
  onEditSuccess,
  replyRefs,
  session,
  index,
  cmtLength,
  post_id,
}) => {
  const { register, handleSubmit } = useForm();
  const [content, setContent] = useState<string>("");
  const [renderKey, setRenderKey] = useState(0);
  const onReplySuccess = () => {
    setRenderKey((prev) => prev + 1);
    setReplyState((prev) => ({ ...prev, [comment.id]: false }));
  };
  const onSubmit = async () => {
    if (!content) return;

    const newComment = {
      content,
      post_id: Number(post_id),
      user_id: Number(session.user.id),
      parent_id: Number(comment.id),
    };

    try {
      const createdComment = await createComments(newComment);
      alert("답글이 등록되었습니다.");

      usePostStore.getState().addNestedComment(createdComment);
      setContent("");
      setReplyState((prev) => ({ ...prev, [comment.id]: false }));
    } catch (err) {
      alert("답글 작성 실패.");
      console.error("Error submitting comment:", err);
    }
  };

  return (
    <div
      className={clsx("mt-6 ml-1.5 py-[2px] min-w-0 w-4/5", {
        "border-l border-gray-300 pl-4": depth > 0,
        "mb-8": index + 1 === cmtLength,
      })}
    >
      {/* 댓글 내용 */}
      <div className="flex items-center pr-1 overflow-hidden">
        <div className="flex flex-col overflow-hidden">
          <div className="flex items-center mb-2 relative overflow-hidden whitespace-nowrap w-auto">
            <span className="flex items-center text-neutral-content-weak text-12 overflow-hidden">
              <span className="text-zinc-950">
                {comment?.user?.nickname ?? "알 수 없는 사용자"}
              </span>
              <span className="mx-1">·</span>
              <span>{getRelativeTime(comment?.createdAt ?? "")}</span>
            </span>
          </div>
        </div>
      </div>

      {!editState[comment.id] ? (
        <div className="text-14 rounded-[8px] pb-0.5 overflow-hidden">
          <div
            className="py-0 mx-0.5 inline-block max-w-full"
            dangerouslySetInnerHTML={{ __html: comment.content ?? "" }}
          />
        </div>
      ) : (
        <EditComments
          editState={() => onEditClick(comment.id)}
          commentId={comment.id}
          initialContent={comment.content}
          onEditSuccess={onEditSuccess}
        />
      )}

      {!editState[comment.id] && (
        <CommentsActionRows
          onReply={() => onReplyClick(comment.id)}
          commentId={comment.id}
          onEdit={() => onEditClick(comment.id)}
          commentCreateUserId={comment.user_id}
          currentUserId={session?.user?.id}
          className="!mt-0.5"
        />
      )}

      {/* 답글 입력창 */}
      {replyState[comment.id] && (
        <div
          ref={(el) => (replyRefs.current[comment.id] = el)}
          className="w-full mb-6"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextEditor
              value={content}
              onChange={setContent}
              className="w-full !rounded-3xl"
            />
            <div className="flex justify-end gap-2 mt-2">
              <button
                type="button"
                className="px-3.5 py-1.5 text-xs text-gray-700 rounded hover:bg-gray-200"
                onClick={() =>
                  setReplyState((prev) => ({ ...prev, [comment.id]: false }))
                }
              >
                취소
              </button>
              <button
                type="submit"
                className="px-3.5 py-1.5 text-xs rounded bg-blue-200 text-gray-700"
              >
                등록
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 자식 댓글 렌더링 */}
      {comment.children?.length > 0 &&
        comment.children.map((childComment: any) => (
          <RecursiveComment
            key={`${childComment.id}-${renderKey}`} // key 값에 renderKey 포함
            comment={childComment}
            depth={depth + 1}
            onReplyClick={onReplyClick}
            onEditClick={onEditClick}
            editState={editState}
            replyState={replyState}
            setReplyState={setReplyState}
            onEditSuccess={onEditSuccess}
            replyRefs={replyRefs}
            session={session}
            index={index}
            cmtLength={cmtLength}
            post_id={post_id}
          />
        ))}
    </div>
  );
};
