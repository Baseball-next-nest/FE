"use client";
import { CommunityBox } from "@/features/content-box/CommunityBox";
import { BackButton } from "@/features/button/BackButton";

import Image from "next/image";
import { SearchInput } from "@/features/input/SearchInput";
import { PostActionRows } from "@/features/rows/PostActionRow";
import { CommentsActionRows } from "@/features/rows/CommentsActionRows";
import { fetchBoardPostById } from "@/app/api/api";
import { getTeamNameInKorean } from "@/features/func/team";
import { getRelativeTime } from "@/features/func/date";
import DropdownMenu from "@/features/button/DropdownMenu";
import { useEffect, useRef, useState } from "react";
import { useFeedStore } from "@/entities/FeedStore";
import { usePostStore } from "@/entities/PostStore";
import { useSessionStore } from "@/entities/SessionStore";
import useLoadingStore from "@/entities/LoadingStore";
import { CommentsInput } from "@/features/input/CommentsInput";
import { Comments } from "@/features/content-box/Comments";

interface PostDetailProps {
  params: { id: number };
  feed: FeedItem[];
}
export default function PostDetail({ params }: PostDetailProps) {
  const { post, setPost } = usePostStore();
  const { session } = useSessionStore();
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLSpanElement | null>(null);
  const commentSectionRef = useRef<HTMLDivElement>(null);

  const scrollToComments = () => {
    commentSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleShareClick = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2300);
    } catch (err) {
      console.error("링크 복사 실패:", err);
    }
  };
  const postId = params.id;
  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!session || !session.user) return;

        console.log(session);
        const userId = session.user.id;
        // const userId = session.user.id;
        const postId = params.id;
        const res = await fetchBoardPostById(Number(postId), Number(userId));
        setPost(res);
        // setPost(res);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPost();
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setShowTooltip(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [session, params.id]);
  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <CommunityBox>
      <div className="w-4/5 flex justify-between text-12 pt-4 pb-1 px-0 relative xs:px-0">
        <span className="flex gap-1.5 items-center pr-2 truncate">
          <BackButton />
          <div className="flex mr-1 text-32 items-center overflow-hidden flex-shrink-0 indent-0 w-8 h-8">
            <Image
              src={`/logos/${
                post.category === "hanwha"
                  ? "hanwha.png"
                  : `${post.category}.svg`
              }`}
              alt={post.category}
              width={32}
              height={32}
            />
          </div>
          <div className="flex gap-0 flex-col truncate">
            <span className="flex flex-none items-center flex-row gap-1 flex-nowrap">
              <span className="flex flex-none neutral-content font-bold text-12 whitespace-nowrap">
                {getTeamNameInKorean(post.category)}
              </span>
              <span className="flex items-center w-1 text-neutral-content-weak font-normal text-12">
                ·
              </span>
              <span className="flex items-center whitespace-nowrap text-neutral-content-weak font-normal text-12">
                {getRelativeTime(post.createdAt)}
              </span>
            </span>
            <div className="flex flex-none flex-row gap-1 items-center flex-nowrap">
              도영도영
            </div>
          </div>
        </span>
        <span className="w-[32px] h-[32px] flex items-center pb-1 cursor-pointer">
          <DropdownMenu postId={postId} />
          {/* <CiMenuKebab className="w-[24px] h-[24px]" /> */}
        </span>
      </div>
      <h1 className="w-4/5 text-center font-semibold text-neutral-content-strong m-0 text-18 xs:text-24  mb-4  overflow-hidden">
        {post.title}
      </h1>

      <div
        className="relative overflow-hidden pointer-cursor mb-2 bg-neutral-background xs:rounded-[16px]"
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>
      {/* 잡다기능버튼들 */}
      <PostActionRows
        id={params.id}
        isFeed={false}
        onShareClick={handleShareClick}
        onScroll={scrollToComments}
      />
      <div className="relative w-full">
        {showTooltip && (
          <span
            ref={tooltipRef}
            onClick={() => setShowTooltip(false)}
            className="absolute tooltip-position transform -translate-x-1/2 bg-neutral-700 text-white text-xs py-1 px-2 rounded shadow-md"
          >
            링크가 복사되었습니다!
          </span>
        )}
      </div>
      {/* 댓글 */}
      <Comments user={session.user.nickname} ScrollRef={commentSectionRef} />
    </CommunityBox>
  );
}
