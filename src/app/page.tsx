import { Table } from "@/features/table/Table";

async function getHitter() {
  const res = await fetch("http://43.201.105.90:3000/hitter");
  if (!res.ok) {
    throw new Error("데이터 가져오기 실패");
  }
  return res.json();
}
async function getPitcher() {
  const res = await fetch("http://43.201.105.90:3000/pitcher");
  if (!res.ok) {
    throw new Error("데이터 가져오기 실패");
  }
  return res.json();
}

export default async function Home() {
  const hitter = await getHitter();
  const pitcher = await getPitcher();
  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    //
    <main className="text-black flex w-full pt-8 flex-wrap gap-8 min-h-screen">
      <div className="flex w-full">
        {/* 타자 */}
        <div className="w-49p mr-4 ">
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
