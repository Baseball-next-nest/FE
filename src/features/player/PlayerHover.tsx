"use client";

import { FC, useState, useEffect } from "react";
import clsx from "clsx";
import { getPlayerIdData } from "@/app/api/api";

interface PlayerHoverProps {
  playerId: number;
  playerName: string;
}

interface PlayerInfo {
  name: string;
  team: string;
  position: string;
  stats: string;
}

export const PlayerHover: FC<PlayerHoverProps> = ({ playerId, playerName }) => {
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) {
      const fetchPlayerInfo = async () => {
        try {
          const res = await getPlayerIdData(Number(playerId));
          console.log(res);
          if (!res) throw new Error("Failed to fetch player data");
          setPlayerInfo(res);
          console.log(playerInfo);
        } catch (error) {
          console.error("Error fetching player info:", error);
        }
      };

      fetchPlayerInfo();
      console.log(playerInfo);
    }
  }, [isHovered, playerId]);

  return (
    <div className="relative inline-block">
      {/* 선수 이름 */}
      <span
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="cursor-pointer text-blue-500 hover:underline"
      >
        {playerName}
      </span>

      {/* 호버 시 보여줄 정보 */}
      {isHovered && playerInfo && (
        <div
          className={clsx(
            "absolute top-4 left-[8rem] -translate-x-1/2 w-32 p-3 rounded-lg shadow-lg bg-white border border-gray-200",
            "transition-opacity duration-200 z-40"
          )}
        >
          <h3 className="text-lg font-semibold !text-black">
            {playerInfo.name}
          </h3>
          <p className="text-sm text-gray-500 !text-black">{playerInfo.team}</p>
          <p className="text-sm">포지션: {playerInfo.position}</p>
          {/* <p className="text-sm">스탯: {playerInfo.stats}</p> */}
        </div>
      )}
    </div>
  );
};
