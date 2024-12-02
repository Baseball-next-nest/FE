"use client";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useCallback } from "react";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TextEditor({ value, onChange }: TextEditorProps) {
  const handleImageUpload = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        // 이미지 업로드 로직 (예: 클라우드 업로드)
        const formData = new FormData();
        formData.append("image", file);

        try {
          const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });
          const data = await response.json();

          // 업로드된 이미지 URL 가져오기
          const imageUrl = data.url;

          // 에디터에 이미지 삽입
          const quill = (this as any).quill;
          const range = quill.getSelection();
          quill.insertEmbed(range.index, "image", imageUrl);
        } catch (error) {
          console.error("Image upload failed", error);
        }
      }
    };
  }, []);
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // 텍스트 서식
      [{ list: "ordered" }, { list: "bullet" }], // 목록
      ["link", "image"], // 링크와 이미지
    ],
    // handlers: {
    //   image: handleImageUpload, // 커스텀 이미지 업로드 핸들러
    // },
  };

  const formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "image",
  ];

  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
      placeholder="본문을 입력하세요..."
      className="custom-editor bg-white"
    />
  );
}
