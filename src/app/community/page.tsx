"use client";
import { Feed } from "@/features/table/CommunityFeed";
import { PostButton } from "@/features/button/PostButton";
import { SearchInput } from "@/features/input/SearchInput";
import { CommunityBox } from "@/features/content-box/CommunityBox";
import Link from "next/link";
import { fetchSectionPosts } from "../api/api";
import { FC, useEffect, useState } from "react";
import { useFeedStore } from "@/entities/FeedStore";
import { useSessionStore } from "@/entities/SessionStore";
import { getSession } from "@/serverActions/auth";

export default function community() {
  const { feed, setFeed } = useFeedStore();
  const { session } = useSessionStore();
  // console.log(session);
  useEffect(() => {
    if (!session || !session.user) return;

    const userId = session.user.id;

    const fetchFeed = async () => {
      try {
        const res = await fetchSectionPosts(userId);
        setFeed(res);
      } catch (error) {
        console.error("Failed to fetch feed:", error);
      }
    };

    fetchFeed();
  }, [session, setFeed]);
  return (
    <CommunityBox>
      {/* search section */}
      <div className="flex items-baseline">
        <SearchInput placeholder="게시물을 검색해보세요." />
        <PostButton />
      </div>

      {/* search table divide line */}
      <div className="border-t border-gray-300 my-1 w-4/5" />
      {/* table feed section */}
      {/* backend 연결 후 컴포넌트 설정 */}

      <Feed Feed={feed} />

      <div className="border-t border-gray-300 my-1 w-4/5" />
    </CommunityBox>
  );
}
