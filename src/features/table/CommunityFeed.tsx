import Link from "next/link";
import { FC } from "react";
import { getRelativeTime } from "../func/date";
import { getTeamNameInKorean } from "../func/team";
import { PostActionRows } from "../rows/PostActionRow";

interface FeedItem {
  id: number;
  title: string;
  content: string;
  category: string;
  createdAt: string;
  user: { id: number; nickname: string };
}

interface CommunityFeedProps {
  Feed: FeedItem[];
}

export const Feed: FC<CommunityFeedProps> = ({ Feed }) => {
  console.log(Feed);
  return (
    <div className="w-full flex flex-col gap-4 cursor-pointer items-center">
      {Feed.map((item) => (
        <div
          key={item.id}
          className="w-4/5 flex justify-between items-center p-2 px-4 transition duration-300 ease-in-out hover:bg-gray-200 rounded-[16px] relative"
        >
          <div className="flex flex-col">
            <Link href={`/community/post/${item.id}`}>
              <div className="self-start flex flex-col items-start min-w-0 pr-md">
                {/* User Info */}
                <div className="flex items-center mb-2 relative overflow-hidden whitespace-nowrap w-auto">
                  <span className="flex items-center text-neutral-content-weak text-12 overflow-hidden">
                    <span>{item.user.nickname}</span>
                    <span className="mx-1">·</span>
                    <span>{getTeamNameInKorean(item.category)}</span>
                    <span className="mx-1">·</span>
                    <span>{getRelativeTime(item.createdAt)}</span>
                  </span>
                </div>

                {/* Title */}
                <div className="text-18 cursor-pointer line-clamp-3 text-ellipsis text-gray-700 font-semibold mb-0.5 no-underline hover:no-underline visited:text-neutral-content-weak">
                  <span className="font-bold visited:text-neutral-content-weak">
                    {item.title}
                  </span>
                </div>

                {/* Content */}
                <div
                  className="text-16 line-clamp-3 text-ellipsis text-gray-500 mb-2 no-underline hover:no-underline visited:text-neutral-content-weak"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                ></div>
              </div>
            </Link>
            <PostActionRows
              id={item.id}
              className="w-full !mt-2"
              hideShareButton={true}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
