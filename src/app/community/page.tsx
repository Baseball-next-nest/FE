"use client";

import { Feed } from "@/features/table/CommunityFeed";
import { PostButton } from "@/features/button/PostButton";
import { SearchInput } from "@/features/input/SearchInput";
import { CommunityBox } from "@/features/content-box/CommunityBox";
import { fetchSectionPosts } from "../api/api";
import { useEffect, useState, useRef, useCallback } from "react";
import { useFeedStore } from "@/entities/FeedStore";
import { useSessionStore } from "@/entities/SessionStore";

export default function Community() {
  const { feed, setFeed } = useFeedStore();
  const { session } = useSessionStore();

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);

  // initial data
  useEffect(() => {
    if (!session || !session.user) return;

    const fetchInitialFeed = async () => {
      setLoading(true);
      try {
        const res = await fetchSectionPosts(session.user.id, 1);
        setFeed(res);
        setHasMore(res.length > 0); // 데이터가 없으면 로드 X
      } catch (error) {
        console.error("Failed to fetch feed:", error);
      }
      setLoading(false);
    };

    fetchInitialFeed();
  }, [session, setFeed]);

  //추가 데이터 불러오기
  const loadMore = useCallback(async () => {
    if (!session || !session.user || loading || !hasMore) return;

    setLoading(true);
    try {
      const res = await fetchSectionPosts(session.user.id, page + 1);
      setFeed([...feed, ...res]);
      setPage((prevPage) => prevPage + 1);
      setHasMore(res.length > 0);
    } catch (error) {
      console.error("Failed to fetch more posts:", error);
    }
    setLoading(false);
  }, [session, page, loading, hasMore, feed, setFeed]);

  // Intersection Observer
  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [loadMore, hasMore, loading]);

  return (
    <CommunityBox>
      <div className="flex items-baseline">
        <SearchInput placeholder="게시물을 검색해보세요." />
        <PostButton />
      </div>

      <div className="border-t border-gray-300 my-1 w-4/5" />

      <Feed Feed={feed} />

      {/* 🔥 스크롤 감지 트리거 */}
      {loading && <p className="text-center mt-4">로딩 중...</p>}
      <div ref={observerRef} className="h-10" />

      <div className="border-t border-gray-300 my-1 w-4/5" />
    </CommunityBox>
  );
}
