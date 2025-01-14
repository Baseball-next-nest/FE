// "use client";
import { fetchSectionPosts, updateVote } from "@/app/api/api";
import { useFeedStore } from "@/entities/FeedStore";
import useLoadingStore from "@/entities/LoadingStore";
import { useSessionStore } from "@/entities/SessionStore";
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

// like 배열은 id돌려서 같은거면 + - 불가능,

export const PostActionRows: FC<PostActionRowstProps> = ({
  className,
  id,
  hideShareButton,
  onShareClick,
}) => {
  const [likeState, setLikeState] = useState("");
  const { session } = useSessionStore();
  const { setLoading } = useLoadingStore.getState();
  const { feed, updateLikeState } = useFeedStore();
  const post = useFeedStore.getState().feed.find((item) => item.id === id);
  const initialLikeCountRef = useRef(post.likeCount);
  if (!post) return null;

  useEffect(() => {
    const updatedPost = feed.find((item) => item.id === id);
    setLoading(false);
    setLikeState(post.isLiked);
  }, [feed, setLoading]);
  const updatePostVoteState = async (newVoteState: "up" | "down" | "none") => {
    const updatedPost = useFeedStore
      .getState()
      .feed.find((item) => item.id === id);

    if (!updatedPost) return;

    const { likeCount, isLiked } = updatedPost;
    const initialLikeCount = initialLikeCountRef.current;

    let updatedLikeState: "up" | "down" | "none" = isLiked;
    let updatedLikeCount = likeCount;

    // 업데이트된 상태와 카운트를 계산하는 함수
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

    // 상태 계산
    const { updatedState, updatedCount } = calculateLikeState();

    // 업데이트된 상태와 카운트를 적용
    updatedLikeState = updatedState;
    updatedLikeCount = updatedCount;

    // 상태 업데이트
    setLikeState(updatedLikeState);
    updateLikeState(id, updatedLikeState, updatedLikeCount);

    const likeData = {
      post_id: id,
      user_id: Number(session.user.id),
      up_down: updatedLikeState,
    };
    try {
      await updateVote(likeData);
    } catch (error) {
      console.error("Error updating vote state:", error);
      // 실패 시 원복
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
