"use client";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TextEditor({ value, onChange }: TextEditorProps) {
  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      placeholder="본문을 입력하세요..."
      className="bg-white"
    />
  );
}
