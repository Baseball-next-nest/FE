"use client";
import { fetchBoardPostById, updatePost } from "@/app/api/api";
import { useEditorStore } from "@/entities/EditorStore";
import useLoadingStore from "@/entities/LoadingStore";
import { useTeamStore } from "@/entities/TeamStore";
import { CommunityBox } from "@/features/content-box/CommunityBox";
import LoadingSpinner from "@/features/loading/Loading";
import TeamSelector, { teams } from "@/features/select-box/TeamSelector";
import TextEditor from "@/features/select-box/TextEditor";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { mutate } from "swr";

interface EditDetailProps {
  params: { id: number };
}
export default function EditPage({ params }: EditDetailProps) {
  const { content, setContent } = useEditorStore();
  const { selectedTeam, selectTeam } = useTeamStore();
  const { setLoading } = useLoadingStore();
  const router = useRouter();
  // const params = useParams();

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const post = await fetchBoardPostById(Number(params.id));
        console.log(post);
        reset({
          title: post.title,
        });
        setContent(post.content);
        const team = teams.find(
          (team) => team.team === post.category.toLowerCase()
        );

        selectTeam(team || null);
      } catch (err) {
        console.error("Failed to fetch post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.id, reset, setContent, selectTeam, setLoading]);

  const onSubmit = async (data: { title: string }) => {
    if (!selectedTeam) {
      alert("팀을 선택해주세요");
      return;
    }

    const updatedPost = {
      postId: Number(params.id),
      category: selectedTeam.team,
      title: data.title,
      content,
    };

    try {
      setLoading(true);
      await updatePost(updatedPost);
      router.push(`/community/post/${params.id}`);
      // alert("게시물이 수정되었습니다.");
    } catch (err) {
      console.error("Error updating post:", err);
      alert("게시물 수정에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CommunityBox>
      <LoadingSpinner />
      <div className="flex self-start items-center ">
        <h1 className="indent-8 mb-2 text-24 text-neutral-content font-bold ml-6">
          글 수정하기
        </h1>
      </div>
      <TeamSelector />
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
            <TextEditor
              value={content}
              onChange={setContent}
              placeholder="본문을 입력해주세요."
            />
          </div>
          <div className="self-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
            >
              수정
            </button>
          </div>
        </form>
      </section>
    </CommunityBox>
  );
}
