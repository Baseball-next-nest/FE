"use client";

import { useEditorStore } from "@/entities/EditorStore";
import { useTeamStore } from "@/entities/TeamStore";
import { CommunityBox } from "@/features/content-box/CommunityBox";
import TeamSelector from "@/features/select-box/TeamSelector";
import TextEditor from "@/features/select-box/TextEditor";
import { useForm } from "react-hook-form";
export default function post() {
  const { content, setContent } = useEditorStore();
  const { selectedTeam } = useTeamStore();
  console.log(content);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: { title: string }) => {
    if (!selectedTeam) {
      alert("팀을 선택해주세요.");
      return;
    }

    const postData = {
      team: selectedTeam.team,
      title: data.title,
      content,
    };

    console.log("Form Submitted:", postData);

    // 이후 실제 API 호출 코드 추가
    // await fetch("/api/posts", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(postData),
    // });
    alert("게시글이 성공적으로 제출되었습니다.");
  };
  return (
    <CommunityBox>
      {/* 새글쓰기 */}
      <div className="flex self-start items-center ">
        <h1 className="indent-8 mb-2 text-24 text-neutral-content font-bold ml-6">
          새 글 쓰기
        </h1>
      </div>
      {/* 팀 셀렉트 */}
      <TeamSelector />
      {/* 메인 section */}
      <section className="self-start ml-12 w-full">
        <form className="flex flex-col p-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            {/* <label className="inline-block font-medium text-[rgb(33,37,41)] break-words cursor-default tap-highlight-transparent text-base mb-2">
              제목
            </label> */}
            <input
              placeholder="제목을 입력해주세요."
              className={`form-input-currect ${
                errors.title ? "border-red-500 focus:border-red-500" : ""
              }`}
              {...register("title", {
                required: "제목을 입력해주세요.",
              })}
            />
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}
          </div>
          {/* <div>tag</div> */}
          <div className="mb-4">
            {/* <label className="inline-block font-medium text-[rgb(33,37,41)] break-words cursor-default tap-highlight-transparent text-base mb-2">
              본문
            </label> */}
            <TextEditor value={content} onChange={setContent} />
          </div>
          <div className="self-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
            >
              게시
            </button>
          </div>
        </form>
      </section>
    </CommunityBox>
  );
}
