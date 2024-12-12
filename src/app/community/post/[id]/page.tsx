import { CommunityBox } from "@/features/content-box/CommunityBox";
import { BackButton } from "@/features/button/BackButton";
import { notFound } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";
import { CiMenuKebab } from "react-icons/ci";

import Image from "next/image";
import { SearchInput } from "@/features/input/SearchInput";
import { PostActionRows } from "@/features/rows/PostActionRow";
import { CommentsActionRows } from "@/features/rows/CommentsActionRows";
interface PostDetailProps {
  params: { id: string };
}

// async function fetchPost(id: string) {
//   const response = await fetch(`https://your-api.com/posts/${id}`, {
//     cache: "no-store",
//   });

//   if (!response.ok) {
//     return null;
//   }

//   return response.json();
// }

export default async function PostDetail({ params }: PostDetailProps) {
  // const post = await fetchPost(params.id);

  // if (!post) {
  //   return notFound();
  // }

  return (
    <CommunityBox>
      <div className="w-4/5 flex justify-between text-12 pt-4 pb-1 px-0 relative xs:px-0">
        <span className="flex gap-1.5 items-center pr-2 truncate">
          <BackButton />
          <div className="flex mr-1 text-32 items-center overflow-hidden flex-shrink-0 indent-0 w-8 h-8">
            <Image
              src="/logos/doosan.svg"
              alt="doosan"
              width={32}
              height={32}
            />
          </div>
          <div className="flex gap-0 flex-col truncate">
            <span className="flex flex-none items-center flex-row gap-1 flex-nowrap">
              <span className="flex flex-none neutral-content font-bold text-12 whitespace-nowrap">
                두산 베어스
              </span>
              <span className="flex items-center w-1 text-neutral-content-weak font-normal text-12">
                ·
              </span>
              <span className="flex items-center whitespace-nowrap text-neutral-content-weak font-normal text-12">
                2일전
              </span>
            </span>
            <div className="flex flex-none flex-row gap-1 items-center flex-nowrap">
              도영도영
            </div>
          </div>
        </span>
        <span className="w-[32px] h-[32px] flex items-center pb-1 cursor-pointer">
          <CiMenuKebab className="w-[24px] h-[24px]" />
        </span>
      </div>
      <h1 className="w-4/5 text-left font-semibold text-neutral-content-strong m-0 text-18 xs:text-24  mb-4  overflow-hidden">
        두산베어스 화이팅 두산베어스 화이팅 두산베어스 화이팅 두산베어스 화이팅
      </h1>

      <div className="relative overflow-hidden pointer-cursor mb-2 isolate bg-neutral-background xs:rounded-[16px]">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis
        corporis ad error perspiciatis, eaque dignissimos ex ullam saepe enim
        aut minus architecto similique blanditiis consectetur eligendi quia?
        Excepturi, unde ex?
      </div>
      {/* 잡다기능버튼들 */}
      <PostActionRows />

      {/* 댓글 */}
      <div className="relative w-full flex items-center justify-center mt-8">
        <SearchInput
          className="w-full py-3 focus:border-gray-700"
          placeholder="댓글을 추가해보세요"
        />
      </div>

      <div className="comment-meta mt-6 ml-1.5 py-[2px] min-w-0 w-4/5">
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
    </CommunityBox>
  );
}
