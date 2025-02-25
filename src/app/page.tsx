import { Table } from "@/features/table/Table";
import { getHitter, getPitcher } from "./api/api";
import AuthSection from "@/wigets/header/ui/AuthSection";
import { getSession } from "@/serverActions/auth";

export default async function Home() {
  const hitter = await getHitter();
  const pitcher = await getPitcher();
  const session = await getSession();
  // console.log("getSEsiion " + JSON.stringify(hitter));
  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    //
    <main className="text-black flex w-full pt-8 flex-wrap gap-8">
      {/* <div>
        <AuthSection />
      </div> */}
      <div className="flex w-full">
        {/* 타자 */}
        <div className="w-49p mr-4">
          <Table hitter={hitter}>WAR TOP 20 타자</Table>
        </div>
        {/* 투수 */}
        <div className="w-49p">
          <Table pitcher={pitcher}>WAR TOP 20 투수</Table>
        </div>
      </div>
    </main>
  );
}
