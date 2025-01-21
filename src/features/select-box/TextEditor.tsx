"use client";

// import dynamic from "next/dynamic";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import clsx from "clsx";
import { useCallback, useRef } from "react";
import { uploadFiles } from "@/app/api/api";

// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface TextEditorProps {
  value: string;
  placeholder?: string;
  className?: string;
  onChange: (value: string) => void;
}

export default function TextEditor({
  value,
  onChange,
  placeholder,
  className,
}: TextEditorProps) {
  // ReactQuill ref
  const quillRef = useRef<any>(null);

  // 이미지 업로드 핸들러
  const handleImageUpload = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        try {
          const response = await uploadFiles(formData);
          console.log(response);

          const imageUrl = response.fileUrl;
          console.log(imageUrl);

          const quill = quillRef.current?.getEditor();
          const range = quill?.getSelection();
          if (range) {
            quill.insertEmbed(range.index, "image", imageUrl);
            quill.setSelection(range.index + 1);
          }
        } catch (error) {
          console.error("Image upload failed", error);
        }
      }
    };
  }, []);

  const modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike"], // 텍스트 서식
        [{ list: "ordered" }, { list: "bullet" }], // 목록
        ["link", "image"], // 링크 및 이미지
      ],
      handlers: {
        image: handleImageUpload, // 이미지 업로드 핸들러 등록
      },
    },
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
      ref={(instance) => {
        if (instance) quillRef.current = instance;
      }}
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
      placeholder={placeholder}
      className={clsx("custom-editor bg-white", className)}
    />
  );
}
