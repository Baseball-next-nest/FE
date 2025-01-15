"use client";
import { FC, useState } from "react";
import { CommentsActionRows } from "../rows/CommentsActionRows";
import { CommentsInput } from "../input/CommentsInput";

interface CommentsProps {
  ScrollRef: any;
}

export const Comments: FC<CommentsProps> = ({ ScrollRef }) => {
  const [isCommentClicked, setIsCommentClick] = useState(false);
  const onCommentClick = () => {
    setIsCommentClick(true);
  };
  const onCancelClick = () => {
    setIsCommentClick(false);
    console.log(isCommentClicked);
  };
  return (
    <>
      <div className="relative w-full flex flex-col items-center justify-center mt-8">
        {/* 에디터 */}
        {isCommentClicked && (
          <div className="w-full mb-4">
            <div className="p-4 border rounded-lg bg-gray-100">여긴 에디터</div>
          </div>
        )}

        {/* 댓글 입력창 */}
        <CommentsInput
          className="w-full py-3 focus:border-gray-700"
          onClick={onCommentClick}
          placeholder="댓글을 추가해보세요"
        />
        {/* <CommentsInput
          className="w-full max-w-md py-3 px-4 focus:border-gray-700 border rounded-lg"
          placeholder="댓글을 추가해보세요"
          onClick={onCommentClick}
        /> */}

        {/* 버튼 섹션 */}
        {isCommentClicked && (
          <div className="flex gap-2 mt-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => alert("댓글 작성 완료")}
            >
              작성
            </button>
            <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
              onClick={onCancelClick} // 취소 버튼 클릭
            >
              취소
            </button>
          </div>
        )}
      </div>

      <div
        className="comment-meta mt-6 ml-1.5 py-[2px] min-w-0 w-4/5"
        ref={ScrollRef}
      >
        <div className="flex items-center pr-1 overflow-hidden">
          <div className="flex flex-col overflow-hidden">
            <div className="flex items-center mb-2 relative overflow-hidden whitespace-nowrap w-auto">
              <span className="flex items-center text-neutral-content-weak text-12 overflow-hidden">
                <span className="text-zinc-950">닉네임</span>
                <span className="mx-1">·</span>
                <span>시간</span>
                <span className="mx-1">·</span>
              </span>
            </div>
          </div>
        </div>
        <div className="text-14 rounded-[8px] pb-0.5 overflow-hidden">
          <div className="py-0 mx-0.5 inline-block max-w-full">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatibus quasi suscipit quisquam at error cumque voluptatem
              numquam inventore veritatis tenetur? Dolorem explicabo rerum,
              exercitationem in ut quo nesciunt vitae molestiae!
            </p>
          </div>
        </div>
        <CommentsActionRows className="!mt-0.5" />
      </div>
    </>
  );
};
