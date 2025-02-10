import { editComments } from "@/app/api/api";
import { FC, useState } from "react";
import dynamic from "next/dynamic";
const TextEditor = dynamic(() => import("@/features/select-box/TextEditor"), {
  ssr: false,
});
interface EditCommentsProps {
  commentId: number;
  initialContent: string;
  editState: (state: boolean) => void;
  onEditSuccess: (updatedComment: { id: number; content: string }) => void; // 콜백 추가
}

export const EditComments: FC<EditCommentsProps> = ({
  commentId,
  initialContent,
  editState,
  onEditSuccess,
}) => {
  const [content, setContent] = useState<string>(initialContent);

  const onSubmit = async () => {
    if (content === "") return;
    if (content === initialContent) {
      editState(false);
      return;
    }

    const updatedComment = {
      content,
      commentId: Number(commentId),
    };

    try {
      await editComments(updatedComment);
      onEditSuccess({ id: commentId, content }); // 수정 성공 시 상위로 수정된 데이터 전달
      editState(false);
    } catch (err) {
      alert("댓글 수정 실패.");
      console.error("Error updating comment:", err);
    }
  };

  const onCancelClick = () => {
    if (window.confirm("그만둘 경우 수정 중인 내용이 모두 사라져요.")) {
      editState(false);
    }
  };

  return (
    <form className="w-full" onSubmit={onSubmit}>
      <TextEditor
        value={content}
        onChange={setContent}
        className="w-full !rounded-3xl"
      />
      <div className="w-11/12 flex items-center justify-end gap-2 mt-4">
        <button
          type="button"
          className="px-3.5 py-1.5 text-xs text-gray-700 rounded hover:bg-gray-200"
          onClick={onCancelClick}
        >
          취소
        </button>
        <button
          type="submit"
          className="px-3.5 py-1.5 text-xs rounded text-gray-700 bg-gray-200"
        >
          수정
        </button>
      </div>
    </form>
  );
};
