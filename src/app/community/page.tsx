import { Feed } from "@/features/table/CommunityFeed";
import { PostButton } from "@/features/button/PostButton";
import { SearchInput } from "@/features/input/SearchInput";
import { CommunityBox } from "@/features/content-box/CommunityBox";
import Link from "next/link";
import { fetchSectionPosts } from "../api/api";

export default async function community() {
  const fetchPost = await fetchSectionPosts("");
  console.log(fetchPost);
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

      <Feed />

      <div className="border-t border-gray-300 my-1 w-4/5" />
    </CommunityBox>
  );
}
