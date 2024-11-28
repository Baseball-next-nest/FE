import Link from "next/link";
import { FC } from "react";

interface CommunityFeedProps {}

export const Feed: FC<CommunityFeedProps> = ({}) => {
  return (
    <div className="w-4/5 flex justify-between items-center p-4 transition duration-300 ease-in-out hover:bg-gray-200 rounded-[16px] relative">
      <div className="self-start flex flex-col items-start min-w-0 pr-md">
        <div className="flex items-center mb-2 relative overflow-hidden whitespace-nowrap w-auto">
          <span className="flex items-center text-neutral-content-weak text-12 overflow-hidden">
            <span>닉네임</span>
            <span className="mx-1">·</span>
            <span>두산</span>
            <span className="mx-1">·</span>
            <span>시간</span>
          </span>
        </div>
        <Link
          href={"/"}
          className="text-18 line-clamp-3 text-ellipsis text-gray-700 font-semibold mb-2 no-underline hover:no-underline visited:text-neutral-content-weak"
        >
          <span className="font-bold visited:text-neutral-content-weak">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam
            amet, voluptatibus recusandae perferendis similique hic explicabo
            incidunt officiis perspiciatis alias ab vitae earum cupiditate animi
            sed pariatur. Exercitationem, modi dolorem.
          </span>
        </Link>
        <div className="text-neutral-content-weak text-12">
          <span>좋아요 8</span>
          <span className="mx-1">·</span>
          <span>댓글 24</span>
        </div>
      </div>
    </div>
  );
};
