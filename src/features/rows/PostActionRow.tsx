import clsx from "clsx";
import Link from "next/link";
import { FC, useState } from "react";
import { FaArrowUp, FaArrowDown, FaRegComment, FaShare } from "react-icons/fa";
interface PostActionRowstProps {
  className: string;
  id: number;
  hideShareButton: boolean;
  onShareClick: () => void;
}

export const PostActionRows: FC<PostActionRowstProps> = ({
  className,
  id,
  hideShareButton,
  onShareClick,
}) => {
  return (
    // className={clsx(
    //   "w-96 rounded-full border border-gray-300 p-2 px-4 py-2 text-sm focus:border-transparent focus:shadow-md focus:outline-none",
    //   className
    // )}
    <div
      className={clsx(
        "w-4/5 flex gap-2.5 flex-row items-center flex-nowrap overflow-hidden justify-start h-12 mt-4 px-0",
        className
      )}
    >
      <span className="relative">
        <span className="h-8 px-4 p-0 text-12 inline-flex items-center button-shell overflow-visible font-semibold flex items-center cursor-auto rounded-[16px]">
          <button className="rounded-[16px] hover:bg-gray-300">
            <span className="flex my-1.5 mx-1.5 text-16">
              <FaArrowUp className="arrow-up" />
            </span>
          </button>
          <span className="">297</span>
          <button className="rounded-[16px] hover:bg-gray-300">
            <span className="flex my-1.5 mx-1.5 text-16">
              <FaArrowDown className="arrow-down" />
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
            <span>{id}</span>
          </Link>
        </span>
      ) : (
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
