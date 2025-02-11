"use client";
import { deleteComments, updateCommentVote } from "@/app/api/api";
import useLoadingStore from "@/entities/LoadingStore";
import clsx from "clsx";
import { FC, useEffect, useState } from "react";
import { FaRegComment, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { MdOutlineCreate, MdDeleteOutline } from "react-icons/md";
import LoadingSpinner from "../loading/Loading";
import { CommentsInput } from "../input/CommentsInput";
import { usePostStore } from "@/entities/PostStore";
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
  const comment = post?.comment?.find((cmt) => cmt.id == commentId);
  useEffect(() => {
    setLikeState(comment?.isLiked);
  }, []);

  const handleEdit = () => {
    onEdit();
  };
  const handleDelete = async () => {
    if (window.confirm("해당 댓글을 삭제하시겠습니까?")) {
      try {
        setLoading(true);
        await deleteComments(commentId);
        setPost({
          ...post!,
          comment: post!.comment.filter((cmt) => cmt.id !== commentId),
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
    const comment = post?.comment?.find((cmt) => cmt.id == commentId);
    const { likeCount, isLiked } = comment;
    let updatedLikeState: "up" | "down" | "none" = isLiked;
    let updatedLikeCount = likeCount;
    const calculateLikeState = () => {
      if (isLiked === null || isLiked === "none") {
        // 초기
        return {
          updatedState: newVoteState,
          updatedCount:
            newVoteState === "up"
              ? Math.min(updatedLikeCount + 1, likeCount + 1)
              : Math.max(updatedLikeCount - 1, likeCount - 1),
        };
      } else if (isLiked === newVoteState) {
        // 동일
        return {
          updatedState: "none",
          updatedCount:
            newVoteState === "up" ? updatedLikeCount - 1 : updatedLikeCount + 1,
        };
      } else {
        // 반대
        return {
          updatedState: newVoteState,
          updatedCount:
            newVoteState === "up" ? updatedLikeCount + 2 : updatedLikeCount - 2,
        };
      }
    };
    const { updatedState, updatedCount } = calculateLikeState();

    updatedLikeState = updatedState;
    updatedLikeCount = updatedCount;

    setLikeState(updatedLikeState);
    updateCommentLikeState(comment.id, updatedLikeState, updatedLikeCount);

    const likeData = {
      comment_id: Number(comment.id),
      user_id: Number(currentUserId),
      up_down: updatedLikeState,
    };
    console.log(likeData);
    try {
      await updateCommentVote(likeData);
    } catch (error) {
      console.error("Error updating vote state:", error);
      // updateLikeState(id, isLiked, likeCount);
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
          <span>{comment?.likeCount}</span>
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
