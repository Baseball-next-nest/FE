"use client";

import { FC, useState, useEffect, useMemo } from "react";
import clsx from "clsx";
import { getPlayerIdData } from "@/app/api/api";
import Image from "next/image";
import { calculateAge } from "../func/date";

interface PlayerHoverProps {
  playerId: number;
  playerName: string;
}

interface PlayerInfo {
  name: string;
  team: string;
  position: string;
  back_number: string;
  birth_date: string;
  image_url: string;
  group: string;
  season: [];
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
  const team = useMemo(() => {
    if (!playerInfo?.team) return "";

    switch (playerInfo.team) {
      case "키움":
        return "kiwoom";
      case "롯데":
        return "lotte";
      case "두산":
        return "doosan";
      case "삼성":
        return "samsung";
      case "한화":
        return "hanhwa";
      default:
        return playerInfo.team.toLowerCase();
    }
  }, [playerInfo?.team]);

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
            "absolute flex flex-col top-0 left-[13rem] w-[20rem] -translate-x-1/2 p-3 rounded-lg shadow-lg bg-white border border-gray-200",
            "transition-opacity duration-200 z-40"
          )}
        >
          {/* header */}
          <div className="flex justify-around">
            <Image
              width={60}
              height={20}
              src={`/api/proxy?url=${encodeURIComponent(playerInfo.image_url)}`}
              alt={`${playerInfo.name} profile`}
              unoptimized
              className="rounded-sm"
            ></Image>
            {/* 왼쪽 */}
            <div className="flex flex-col justify-evenly">
              <div className="flex">
                <span>{playerInfo.back_number}.</span>
                <h3 className="text-lg font-semibold !text-black">
                  {playerInfo.name}
                </h3>
              </div>

              <div>
                <p className="text-sm">{playerInfo.position}</p>
              </div>
              <div className="flex flex-col">
                <div>
                  <span>{calculateAge(playerInfo.birth_date)}세</span>
                  <span className="text-[0.6rem]">
                    ({playerInfo.birth_date})
                  </span>
                </div>
              </div>
            </div>

            {/* 오른쪽 */}
            <div className="flex flex-col items-start">
              <div className="flex">
                <Image
                  src={`${
                    team !== "hanhwa"
                      ? `/logos/${team}.svg`
                      : `/logos/${team}.png`
                  }`}
                  alt={playerInfo.team}
                  width={24}
                  height={24}
                  className="rounded-full mr-1"
                ></Image>
                <p className="text-sm text-gray-500 !text-black">
                  {playerInfo.team}
                </p>
              </div>
              {/* <div>
                <span>7억</span>
              </div> */}
            </div>
          </div>
          {/* 3시즌 성적 테이블 */}
          <div className="mt-1">
            {playerInfo.group == "B" ? (
              <div className="flex justify-evenly items-center">
                <span>타율: {playerInfo.season[0]?.AVG} </span>
                <span>홈런: {playerInfo.season[0]?.HR}</span>
                <span>
                  WAR: {parseFloat(playerInfo.season[0]?.WAR).toFixed(2)}
                </span>
                <span>
                  WRC+: {parseFloat(playerInfo.season[0]?.WRC).toFixed(1)}
                </span>
              </div>
            ) : (
              <div className="flex justify-evenly items-center">
                <span>
                  승/패: {playerInfo.season[0]?.W}-{playerInfo.season[0]?.L}
                </span>
                <span>삼진: {playerInfo.season[0]?.SO}</span>
                <span>WHIP: {playerInfo.season[0]?.WHIP}</span>
                <span>
                  WAR: {parseFloat(playerInfo.season[0]?.WAR).toFixed(2)}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
