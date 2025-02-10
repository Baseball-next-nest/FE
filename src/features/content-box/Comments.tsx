"use client";
import { FC, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { CommentsActionRows } from "../rows/CommentsActionRows";
import { CommentsInput } from "../input/CommentsInput";
import dynamic from "next/dynamic";
import { useEditorStore } from "@/entities/EditorStore";
import { useForm } from "react-hook-form";
import { createComments } from "@/app/api/api";
import { usePostStore } from "@/entities/PostStore";
import { getRelativeTime } from "../func/date";
import { EditComments } from "./EditConments";
const TextEditor = dynamic(() => import("@/features/select-box/TextEditor"), {
  ssr: false,
});
interface CommentsProps {
  postId: number;
  initialComments: any[];
  session: any;
  ScrollRef: any;
  user: any;
}

export const Comments: FC<CommentsProps> = ({
  ScrollRef,
  initialComments,
  user,
  session,
  postId,
}) => {
  const { content, setContent } = useEditorStore();
  const [isCommentClicked, setIsCommentClick] = useState(false);
  const [editState, setEditState] = useState<{ [key: number]: boolean }>({});
  const [replyState, setReplyState] = useState<{ [key: number]: boolean }>({});
  const replyRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const { post, setPost } = usePostStore();

  console.log(post);
  console.log(session.user.id);

  const isEmptyContent = (text: string) => {
    const cleanedContent = text.replace(/<p><br><\/p>/g, "").trim();
    return cleanedContent === "";
  };

  const onCommentClick = () => {
    setIsCommentClick(true);
  };

  const onReplyClick = (commentId: number) => {
    setReplyState((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
    replyRefs.current[commentId]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const onEditClick = (commentId: number) => {
    setEditState((prev) => ({
      ...prev,
      [commentId]: !prev[commentId], // commentId별로 toggle
    }));
  };

  const onEditSuccess = (updatedComment: { id: number; content: string }) => {
    setPost((prevPost) => {
      if (!prevPost) return null;

      return {
        ...prevPost,
        comment: prevPost.comment.map((comment) =>
          comment.id === updatedComment.id
            ? { ...comment, content: updatedComment.content }
            : comment
        ),
      };
    });
  };
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async () => {
    if (content === "") return;
    const user = session.user.id;
    const newComment = {
      content,
      post_id: Number(postId),
      user_id: Number(user),
    };
    try {
      const createdComment = await createComments(newComment);
      if (post) {
        setPost({
          ...post,
          comment: [createdComment, ...post.comment],
        });
      }
      reset({ content: "" });
      setContent("");
      setIsCommentClick(false);
    } catch (err) {
      alert("댓글 작성실패.");
      console.error("Error submitting post:", err);
      return;
    } finally {
    }
  };
  const onCancelClick = () => {
    if (!isEmptyContent(content)) {
      if (window.confirm("그만둘 경우 작성 중인 내용이 모두 사라져요.")) {
        setContent("");
        setIsCommentClick(false);
      } else {
        return;
      }
    }
    setIsCommentClick(false);
  };
  return (
    <>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="relative w-full flex flex-col items-center justify-center mt-8">
          {/* 댓글 입력창 */}
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
              placeholder={`${user}님, 의견을 공유해보세요!`}
            />
          )}
          {/* 버튼 섹션 */}
          {isCommentClicked && (
            <div className="w-11/12 flex items-center justify-end gap-2 mt-4">
              <button
                className="px-3.5 py-1.5 text-xs text-gray-700 rounded hover:bg-gray-200"
                onClick={onCancelClick}
              >
                취소
              </button>
              <button
                className={clsx(
                  "px-3.5 py-1.5 text-xs rounded text-gray-700 bg-gray-200",
                  {
                    "!bg-blue-200": !isEmptyContent(content),
                  }
                )}
                disabled={isEmptyContent(content)}
                type="submit"
              >
                등록
              </button>
            </div>
          )}
        </div>
      </form>

      {post?.comment?.length > 0 ? (
        post.comment.map((cmt: any, index: number) => (
          <div
            className={clsx("comment-meta mt-6 ml-1.5 py-[2px] min-w-0 w-4/5", {
              "mb-8": index + 1 === post.comment.length,
            })}
            key={cmt.id}
            ref={ScrollRef}
          >
            {/* 댓글 내용 */}
            <div className="flex items-center pr-1 overflow-hidden">
              <div className="flex flex-col overflow-hidden">
                <div className="flex items-center mb-2 relative overflow-hidden whitespace-nowrap w-auto">
                  <span className="flex items-center text-neutral-content-weak text-12 overflow-hidden">
                    <span className="text-zinc-950">
                      {cmt?.user?.nickname ?? "알 수 없는 사용자"}
                    </span>
                    <span className="mx-1">·</span>
                    <span>{getRelativeTime(cmt?.createdAt ?? "")}</span>
                  </span>
                </div>
              </div>
            </div>

            {!editState[cmt.id] ? (
              <div className="text-14 rounded-[8px] pb-0.5 overflow-hidden">
                <div
                  className="py-0 mx-0.5 inline-block max-w-full"
                  dangerouslySetInnerHTML={{ __html: cmt.content ?? "" }}
                ></div>
              </div>
            ) : (
              <EditComments
                editState={setEditState}
                commentId={cmt.id}
                initialContent={cmt.content}
                onEditSuccess={onEditSuccess}
              />
            )}

            {!editState[cmt.id] && (
              <CommentsActionRows
                onReply={() => onReplyClick(cmt.id)}
                commentId={cmt.id}
                onEdit={() => onEditClick(cmt.id)}
                commentCreateUserId={cmt.user_id}
                currentUserId={session.user.id}
                className="!mt-0.5"
              />
            )}

            {replyState[cmt.id] && (
              <div
                ref={(el) => (replyRefs.current[cmt.id] = el)}
                className="w-full mb-6"
              >
                <CommentsInput
                  className="w-full py-3 focus:border-gray-700"
                  placeholder="답글을 달아보세요."
                />
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="mt-4 text-gray-500 text-sm">첫 번째 댓글을 남겨보세요!</p>
      )}
    </>
  );
};
