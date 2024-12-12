"use client";

import { createPost } from "@/app/api/api";
import { useEditorStore } from "@/entities/EditorStore";
import { useSessionStore } from "@/entities/SessionStore";
import { useTeamStore } from "@/entities/TeamStore";
import { CommunityBox } from "@/features/content-box/CommunityBox";
import TeamSelector from "@/features/select-box/TeamSelector";
import TextEditor from "@/features/select-box/TextEditor";
import { getSession } from "@/serverActions/auth";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
export default function post() {
  const { session, setSession } = useSessionStore();
  const { content, setContent } = useEditorStore();
  const { selectedTeam, selectTeam } = useTeamStore();
  console.log(content);
  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSession();
      setSession(sessionData);
    };
    reset({ title: "", content: "" });
    setContent("");
    selectTeam(null);
    fetchSession();
  }, []);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: { title: string }) => {
    if (!selectedTeam) {
      alert("팀을 선택해주세요.");
      return;
    }
    const user = session.user;
    const postData = {
      team: selectedTeam.team,
      title: data.title,
      content,
      user,
    };

    console.log("Form Submitted:", postData);

    await createPost(postData);

    alert("게시글이 성공적으로 제출되었습니다.");

    // form 제출후 초기화슨
    reset({ title: "", content: "" });
    setContent("");
    selectTeam(null);
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
          <div className="mb-4">
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
