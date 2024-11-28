import { CommunityBox } from "@/features/content-box/CommunityBox";
import TeamSelector from "@/features/select-box/TeamSelector";

export default function post() {
  return (
    <CommunityBox>
      {/* 새글쓰기 */}
      <div className="flex self-start items-center ">
        <h1 className="indent-8 mb-4 text-24 text-neutral-content font-bold ml-6">
          새 글 쓰기
        </h1>
      </div>
      {/* 팀 셀렉트 */}
      <TeamSelector />
      <div></div>
      {/* 메인 section */}
      <section>
        <div>title</div>
        <div>tag</div>
        <div>body</div>
      </section>
    </CommunityBox>
  );
}
