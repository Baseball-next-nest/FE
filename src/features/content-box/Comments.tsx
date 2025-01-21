"use client";
import { FC, useState } from "react";
import clsx from "clsx";
import { CommentsActionRows } from "../rows/CommentsActionRows";
import { CommentsInput } from "../input/CommentsInput";
import dynamic from "next/dynamic";
import { useEditorStore } from "@/entities/EditorStore";
const TextEditor = dynamic(() => import("@/features/select-box/TextEditor"), {
  ssr: false,
});
interface CommentsProps {
  ScrollRef: any;
  user: any;
}

export const Comments: FC<CommentsProps> = ({ ScrollRef, user }) => {
  const { content, setContent } = useEditorStore();
  const isEmptyContent = (text: string) => {
    const cleanedContent = text.replace(/<p><br><\/p>/g, "").trim();
    return cleanedContent === "";
  };
  const [isCommentClicked, setIsCommentClick] = useState(false);
  const onCommentClick = () => {
    setIsCommentClick(true);
  };

  const onReplySubmit = () => {};
  const onCancelClick = () => {
    if (!isEmptyContent(content)) {
      if (window.confirm("그만둘 경우 작성 중인 내용이 모두 사라져요.")) {
        setContent("");
        setIsCommentClick(false);
      } else {
        return;
      }
    }
    setIsCommentClick(false);
  };
  return (
    <>
      <div className="relative w-full flex flex-col items-center justify-center mt-8">
        {/* 댓글 입력창 */}
        {isCommentClicked ? (
          <TextEditor value={content} onChange={setContent} />
        ) : (
          <CommentsInput
            className="w-full py-3 focus:border-gray-700"
            onClick={onCommentClick}
            placeholder={`${user}님, 의견을 공유해보세요!`}
          />
        )}
        {/* 버튼 섹션 */}
        {isCommentClicked && (
          <div className="w-11/12 flex items-center justify-end gap-2 mt-4">
            <button
              className="px-3.5 py-1.5 text-xs text-gray-700 rounded hover:bg-gray-200"
              onClick={onCancelClick}
            >
              취소
            </button>
            <button
              className={clsx(
                "px-3.5 py-1.5 text-xs rounded text-gray-700 bg-gray-200",
                {
                  "bg-blue-200": !isEmptyContent(content),
                }
              )}
              disabled={isEmptyContent(content)}
              onClick={onReplySubmit}
            >
              등록
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
