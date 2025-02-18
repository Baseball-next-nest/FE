"use client";
import { deleteComments, updateCommentVote } from "@/app/api/api";
import useLoadingStore from "@/entities/LoadingStore";
import clsx from "clsx";
import { FC, useEffect, useState } from "react";
import { FaRegComment, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { MdOutlineCreate, MdDeleteOutline } from "react-icons/md";
import LoadingSpinner from "../loading/Loading";
import { CommentsInput } from "../input/CommentsInput";
import { removeCommentWithChildren, usePostStore } from "@/entities/PostStore";
import { useModalStore } from "@/entities/ModalStore";

interface CommentsActionRowstProps {
  className?: string;
  commentId: any;
  commentCreateUserId: any;
  currentUserId: any;
  onReply?: () => void;
  onEdit?: () => void;
}

export const CommentsActionRows: FC<CommentsActionRowstProps> = ({
  commentId,
  className,
  commentCreateUserId,
  currentUserId,
  onReply,
  onEdit,
}) => {
  const { setLoading } = useLoadingStore();
  const { post, setPost, updateCommentLikeState } = usePostStore();
  const [likeState, setLikeState] = useState("");
  const [likeCount, setLikeCount] = useState(0);
  const { openLoginModal } = useModalStore();
  useEffect(() => {
    const findCommentRecursively = (
      comments: Comment[],
      targetCommentId: number
    ): Comment | null => {
      for (const comment of comments) {
        if (comment.id === targetCommentId) return comment;
        if (comment.children?.length) {
          const found = findCommentRecursively(
            comment.children,
            targetCommentId
          );
          if (found) return found;
        }
      }
      return null;
    };

    const comment = findCommentRecursively(post?.comment || [], commentId);
    if (comment) {
      setLikeState(comment.isLiked || "none");
      setLikeCount(comment.likeCount || 0);
    }
  }, [post, commentId]);

  const handleEdit = () => {
    onEdit?.();
  };

  const handleDelete = async () => {
    if (window.confirm("해당 댓글을 삭제하시겠습니까?")) {
      try {
        setLoading(true);
        await deleteComments(commentId);
        setPost((prevPost) => {
          if (!prevPost) return prevPost;
          const updatedComments = removeCommentWithChildren(
            prevPost.comment,
            commentId
          );
          return { ...prevPost, comment: updatedComments };
        });
      } catch (err) {
        alert("댓글 삭제 실패.");
        console.error("Error deleting comment", err);
      } finally {
        setLoading(false);
      }
    }
  };

  const updatePostVoteState = async (newVoteState: "up" | "down" | "none") => {
    let updatedLikeState = newVoteState;
    let updatedLikeCount = likeCount;
    if (!currentUserId) {
      openLoginModal();
      return;
    }
    if (likeState === newVoteState) {
      updatedLikeState = "none";
      updatedLikeCount = newVoteState === "up" ? likeCount - 1 : likeCount + 1;
    } else if (likeState === "none" || likeState === null) {
      updatedLikeCount = newVoteState === "up" ? likeCount + 1 : likeCount - 1;
    } else {
      updatedLikeCount = newVoteState === "up" ? likeCount + 2 : likeCount - 2;
    }

    setLikeState(updatedLikeState);
    setLikeCount(updatedLikeCount);

    setPost((prevPost) => {
      if (!prevPost) return prevPost;

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

      const updatedComments = updateNestedCommentLikeState(
        prevPost.comment,
        commentId,
        updatedLikeState,
        updatedLikeCount
      );
      return { ...prevPost, comment: updatedComments };
    });

    try {
      await updateCommentVote({
        comment_id: Number(commentId),
        user_id: Number(currentUserId),
        up_down: updatedLikeState,
      });
    } catch (error) {
      console.error("Error updating vote state:", error);
    }
  };

  return (
    <div
      className={clsx(
        "w-4/5 flex gap-2.5 flex-row items-center flex-nowrap overflow-hidden justify-start h-12 mt-4 px-0",
        className
      )}
    >
      <span className="relative">
        <span
          className={clsx(
            "h-8 p-0 text-12 inline-flex items-center button-shell overflow-visible font-semibold flex items-center cursor-auto rounded-[16px]",
            {
              "up-vote": likeState === "up",
              "down-vote": likeState === "down",
              "": likeState === "none" || likeState === null,
            }
          )}
        >
          <button
            onClick={() => updatePostVoteState("up")}
            className="rounded-[16px] hover:bg-gray-300 aspect-square"
          >
            <span className="flex my-1.5 mx-2 text-16">
              <FaArrowUp
                className={clsx("arrow-up", {
                  "arrow-selected": likeState === "up",
                })}
              />
            </span>
          </button>
          <span>{likeCount}</span>
          <button
            onClick={() => updatePostVoteState("down")}
            className="rounded-[16px] hover:bg-gray-300 aspect-square"
          >
            <span className="flex my-1.5 mx-2 text-16">
              <FaArrowDown
                className={clsx("arrow-down", {
                  "arrow-selected": likeState === "down",
                })}
              />
            </span>
          </button>
        </span>
      </span>
      <span className="h-8 px-2 p-0 text-12 inline-flex items-center overflow-visible font-semibold flex items-center cursor-pointer rounded-[16px] hover:bg-gray-200">
        <span className="mr-1.5">
          <FaRegComment />
        </span>
        <button onClick={onReply}>답글</button>
      </span>
      {currentUserId == commentCreateUserId && (
        <>
          <span className="h-8 px-2 p-0 text-12 inline-flex items-center overflow-visible font-semibold flex items-center cursor-pointer rounded-[16px] hover:bg-gray-200">
            <span className="mr-1.5">
              <MdOutlineCreate />
            </span>
            <button onClick={handleEdit}>수정</button>
          </span>
          <span className="h-8 px-2 p-0 text-12 inline-flex items-center overflow-visible font-semibold flex items-center cursor-pointer rounded-[16px] hover:bg-gray-200">
            <span className="mr-1.5">
              <MdDeleteOutline />
            </span>
            <button onClick={handleDelete}>삭제</button>
          </span>
        </>
      )}
    </div>
  );
};
