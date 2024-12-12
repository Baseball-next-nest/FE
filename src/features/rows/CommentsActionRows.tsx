import clsx from "clsx";
import { FC } from "react";
import {
  FaArrowUp,
  FaArrowDown,
  FaRegComment,
  FaShare,
  FaCaretUp,
  FaCaretDown,
} from "react-icons/fa";
interface CommentsActionRowstProps {
  className?: string;
}

export const CommentsActionRows: FC<CommentsActionRowstProps> = ({
  className,
  ...props
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
        <span className="h-8 px-2 p-0 text-12 inline-flex items-center button-shell overflow-visible font-semibold flex items-center cursor-auto">
          <button className="rounded-[16px] hover:bg-gray-200">
            <span className="flex mx-1.5 text-16">
              <FaCaretUp />
            </span>
          </button>
          <span>33</span>
          <button className="rounded-[16px] hover:bg-gray-200">
            <span className="flex mx-1.5 text-16">
              <FaCaretDown />
            </span>
          </button>
        </span>
      </span>
      <span className="h-8 px-2 p-0 text-12 inline-flex items-center overflow-visible font-semibold flex items-center cursor-pointer rounded-[16px] hover:bg-gray-200">
        <span className="mr-1.5">
          <FaRegComment />
        </span>
        <span>답변</span>
      </span>
      <span className="h-8 px-2 p-0 text-12 inline-flex items-center overflow-visible font-semibold flex items-center cursor-pointer rounded-[16px] hover:bg-gray-200">
        <span className="mr-1.5">
          <FaShare className="color-white" />
        </span>
        <span>공유하기</span>
      </span>
    </div>
  );
};
