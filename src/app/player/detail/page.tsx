import { getPlayerIdData } from "@/app/api/api";
import { PlayerGridTable } from "@/features/table/PlayerGridTable";
import { PlayerTable } from "@/features/table/PlayerTable";

export default async function ({ searchParams }) {
  const id = searchParams.id;
  const playerData = await getPlayerIdData(id);
  const team =
    playerData.team === "키움"
      ? "kiwoom"
      : playerData.team === "롯데"
      ? "lotte"
      : playerData.team === "두산"
      ? "doosan"
      : playerData.team === "삼성"
      ? "samsung"
      : playerData.team === "한화"
      ? "hanhwa"
      : playerData.team.toLowerCase();
  const backgroundColor = `bg-${team}`;
  const playerTableData = playerData.records;
  const playerType = playerData.group;
  console.log(playerData.group);
  // console.log(playerData.records);
  return (
    <div className="basic-container justify-center">
      {playerData ? (
        // 선수정보
        <div className="container overflow-hidden border border-gray-300 bg-gray-100 overflow-hidden rounded-md">
          {/* 사진 */}
          <div
            className={`${backgroundColor} relative h-16 mb-1.5 box-border z-[1000]`}
          >
            <div className="overflow-hidden mx-[126px] ml-[18px] pt-[13px] leading-[20px]">
              {/* 타이틀 */}
              <h2 className="overflow-hidden text-[17px] leading-[20px] text-white font-normal whitespace-nowrap text-ellipsis">
                {playerData.name}
                <span className="ml-[2px] text-[13px] leading-[17px] text-white/50">
                  {playerData.back_number}
                </span>
              </h2>
              {/* 서브타이틀 */}
              <span className="block overflow-hidden text-xs text-white/50 leading-[19px] whitespace-nowrap truncate">
                <em className="mr-[8px]">{playerData.team}</em>
                <em className="em-custom">{playerData.position}</em>
              </span>
            </div>
          </div>
          {/* player grid table */}
          <PlayerGridTable player={playerData}>2024시즌</PlayerGridTable>
          {/* player records table */}
          <PlayerTable player={playerTableData} playerType={playerType}>
            기록
          </PlayerTable>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
