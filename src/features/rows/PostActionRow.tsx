// "use client";
import { updateVote } from "@/app/api/api";
import { useFeedStore } from "@/entities/FeedStore";
import clsx from "clsx";
import Link from "next/link";
import { FC, useEffect, useRef, useState } from "react";
import { FaArrowUp, FaArrowDown, FaRegComment, FaShare } from "react-icons/fa";
interface PostActionRowstProps {
  className?: string;
  id?: number;
  hideShareButton?: boolean;
  onShareClick?: () => void;
}

export const PostActionRows: FC<PostActionRowstProps> = ({
  className,
  id,
  hideShareButton,
  onShareClick,
}) => {
  const [likeState, setLikeState] = useState("");
  const { feed, updateLikeState } = useFeedStore();
  const post = feed.find((item) => item.id === id);
  const initialLikeCountRef = useRef(post.likeCount);
  if (!post) return null;

  useEffect(() => {
    setLikeState(post.isLiked);
  }, []);

  const updatePostVoteState = async (newVoteState: "up" | "down" | "none") => {
    const { likeCount, isLiked } = post;

    const initialLikeCount = initialLikeCountRef.current;

    let updatedLikeState = isLiked;
    let updatedLikeCount = likeCount;

    // 기본 상태
    if (isLiked === null || isLiked === "none") {
      updatedLikeState = newVoteState;
      updatedLikeCount =
        newVoteState === "up"
          ? Math.min(initialLikeCount + 1, likeCount + 1)
          : Math.max(initialLikeCount - 1, likeCount - 1);
    } else if (isLiked === newVoteState) {
      // 동일
      updatedLikeState = "none";
      updatedLikeCount = initialLikeCount;
    } else {
      // 반대
      updatedLikeState = newVoteState;
      updatedLikeCount =
        newVoteState === "up" ? initialLikeCount + 1 : initialLikeCount - 1;
    }
    console.log(updatedLikeState);
    console.log(updatedLikeCount);
    console.log(initialLikeCount);
    const returnCase =
      updatedLikeCount > initialLikeCount + 1 ||
      updatedLikeCount < initialLikeCount - 1;
    if (returnCase) {
      return;
    }

    // 상태 업데이트
    setLikeState(updatedLikeState);
    updateLikeState(id, updatedLikeState, updatedLikeCount);
    const likeData = {
      post_id: id,
      user_id: post.user.id,
      up_down: updatedLikeState,
    };
    console.log(likeData);
    try {
      await updateVote(likeData);
    } catch (error) {
      console.error("Error updating vote state:", error);
      // 실패시 원복
      updateLikeState(id, isLiked, likeCount);
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
            "h-8 px-4 p-0 text-12 inline-flex items-center button-shell overflow-visible font-semibold flex items-center cursor-auto rounded-[16px]",
            {
              "up-vote": likeState === "up",
              "down-vote": likeState === "down",
              "": likeState === "none" || likeState === null,
            }
          )}
        >
          <button
            onClick={() => updatePostVoteState("up")}
            className="rounded-[16px] hover:bg-gray-300"
          >
            <span className="flex my-1.5 mx-1.5 text-16">
              <FaArrowUp
                className={clsx("arrow-up", {
                  "arrow-selected": likeState === "up",
                })}
              />
            </span>
          </button>
          <span className="">{post?.likeCount}</span>
          <button
            onClick={() => updatePostVoteState("down")}
            className="rounded-[16px] hover:bg-gray-300"
          >
            <span className="flex my-1.5 mx-1.5 text-16">
              <FaArrowDown
                className={clsx("arrow-down", {
                  "arrow-selected": likeState === "down",
                })}
              />
            </span>
          </button>
        </span>
      </span>

      {id ? (
        <span>
          <Link
            className="h-8 px-4 p-0 text-12 inline-flex items-center overflow-visible font-semibold flex items-center cursor-pointer rounded-[16px] hover:bg-gray-300"
            href={`/community/post/${id}`}
          >
            <span className="mr-1.5">
              <FaRegComment />
            </span>
            {/* comment quantity api나오면 수정요망 */}
            <span>{id}</span>
          </Link>
        </span>
      ) : (
        // 스크롤 댓글창으로 가게 수정요망
        <span className="h-8 px-4 p-0 text-12 inline-flex items-center overflow-visible font-semibold flex items-center cursor-pointer rounded-[16px] hover:bg-gray-300">
          <span className="mr-1.5">
            <FaRegComment />
          </span>
          <span>11</span>
        </span>
      )}

      {!hideShareButton && (
        <span
          onClick={onShareClick}
          className="h-8 px-4 p-0 text-12 inline-flex items-center overflow-visible font-semibold flex items-center cursor-pointer rounded-[16px] hover:bg-gray-300"
        >
          <span className="mr-1.5">
            <FaShare className="color-white" />
          </span>
          <span>공유하기</span>
        </span>
      )}
    </div>
  );
};
