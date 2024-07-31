"use client";
import React, { FC, ReactNode, useRef } from "react";
import { ContentBox } from "../content-box/ContentBox";
import {
  useHitterStatsLabelsStore,
  usePitcherStatsLabelsStore,
} from "@/entities";
interface PlayerTableProps {
  children: ReactNode;
  player: any[];
  playerType: string;
}
export const PlayerTable: FC<PlayerTableProps> = ({
  player,
  playerType,
  children,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const touch = () => {
    console.log("logggg");
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    console.log("logggg");
    console.log(e);
    if (scrollRef.current) {
      const touchStart = e.touches[0].clientX;
      const scrollLeft = scrollRef.current.scrollLeft;

      const handleTouchMove = (e: TouchEvent) => {
        const touchEnd = e.touches[0].clientX;
        scrollRef.current!.scrollLeft = scrollLeft + (touchStart - touchEnd);
      };

      const handleTouchEnd = () => {
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
      };

      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleTouchEnd);
    }
  };

  const hitterLabels = useHitterStatsLabelsStore((state) => state.HitterLabels);
  const pitcherLabels = usePitcherStatsLabelsStore(
    (state) => state.PitcherLabels
  );
  return (
    <ContentBox>
      <div className="flex items-center h-12 px-[5px] pl-[18px] border-b border-[#ecf0f2]">
        <h3 className="overflow-hidden text-ellipsis whitespace-nowrap text-[17px] font-bold text-black">
          {children}
        </h3>
      </div>
      {/* scroll 왼쪽 고정값 */}
      <div className="p-4.5">
        <div className="overflow-hidden relative">
          <div className="relative z-2 w-[60px] bg-white">
            <div className="border-t-[1px] border-b-[1px] border-r-[1px] border-l-[1px] border-t-[#709ce4] border-b-[#709ce4] border-r-[#6f9be2] border-l-[#709ce4] h-[37px] m-0 bg-[#77a4f0] text-center">
              <strong className="text-[15px] font-normal leading-[35px] text-white">
                시즌
              </strong>
            </div>
            <ul>
              {player.map((player, index) => (
                <li
                  key={index}
                  className={`relative border ${
                    index < 2
                      ? "bg-[#f1f6fe] border-[#dfe8f0] border-t-0 text-[#424242]"
                      : "border-[#ecf0f2] border-t-0 bg-white text-[#8f8f8f]"
                  } h-[36px] m-0 text-[15px] leading-[36px] text-center`}
                >
                  {player.year}
                </li>
              ))}
            </ul>
          </div>
          {/* table start */}
          <div
            ref={scrollRef}
            onDragStart={touch}
            className="scroll-wrap absolute inset-0 visible touch-pan-y touch-pinch-zoom select-none"
          >
            <div className="absolute h-full min-w-full transition-none transform translate-x-0 translate-y-0 translate-z-0 transition-[custom-ease]">
              <div className="overflow-hidden pl-[62px] box-border mr-[21px]">
                <table className="mt-0 w-full border-separate border-spacing-0">
                  {/* thead */}
                  <thead>
                    <tr>
                      {player && playerType === "B"
                        ? hitterLabels.map((label, index) => (
                            // 타자
                            <th
                              className={`${
                                index === 0 ? "border-l-0 pl-[7px]" : ""
                              } text-[15px] min-w-[54px] h-[37px] bg-[#78a5ee] border-t border-t-[#709ce4] border-b border-b-[#709ce4] font-normal whitespace-nowrap text-white`}
                              key={index}
                            >
                              {label}
                            </th>
                          ))
                        : pitcherLabels.map((label, index) => (
                            // 투수
                            <th
                              className={`${
                                index === 0 ? "border-l-0 pl-[7px]" : ""
                              } text-[15px] min-w-[54px] h-[37px] bg-[#78a5ee] border-t border-t-[#709ce4] border-b border-b-[#709ce4] font-normal whitespace-nowrap text-white`}
                              key={index}
                            >
                              {label}
                            </th>
                          ))}
                    </tr>
                  </thead>
                  {/* tbody */}
                  <tbody>
                    {player && playerType === "B"
                      ? player.map((player, index) => (
                          <tr
                            key={index}
                            className={`${
                              index < 2
                                ? "bg-[#f1f6fe] border-[#dfe8f0] border-t-0 text-[#424242]"
                                : "bg-[#fff] border-b border-[#ecf0f2] text-[#8f8f8f]"
                            } *:h-[36px] *:text-center *:text-[15px] *:whitespace-nowrap`}
                          >
                            <td>{player.AVG}</td>
                            <td>{player.G}</td>
                            <td>{player.AB}</td>
                            <td>{player.H}</td>
                            <td>{player["2B"]}</td>
                            <td>{player["3B"]}</td>
                            <td>{player.HR}</td>
                            <td>{player.R}</td>
                            <td>{player.RBI}</td>
                            <td>{player.SB}</td>
                            <td>{player.BB}</td>
                            <td>{player.SO}</td>
                            <td>{player.OBP}</td>
                            <td>{player.SLG}</td>
                            <td>{player.OPS}</td>
                            <td>{player.WRC}</td>
                            <td>{player.WAR}</td>
                          </tr>
                        ))
                      : player.map((player, index) => (
                          <tr
                            key={index}
                            className={`${
                              index < 2
                                ? "bg-[#f1f6fe] border-[#dfe8f0] border-t-0 text-[#424242]"
                                : "bg-[#fff] border-b border-[#ecf0f2] text-[#8f8f8f]"
                            } *:h-[36px] *:text-center *:text-[15px] *:whitespace-nowrap`}
                          >
                            <td>{player.ERA}</td>
                            <td>{player.G}</td>
                            <td>{player.IP}</td>
                            <td>{player.W}</td>
                            <td>{player.L}</td>
                            <td>{player.S}</td>
                            <td>{player.HD}</td>
                            <td>{player.SO}</td>
                            <td>{player.H}</td>
                            <td>{player.HR}</td>
                            <td>{player.R}</td>
                            <td>{player.BB}</td>
                            <td>{player.HP}</td>
                            <td>{player.WHIP}</td>
                            <td>{player.FIP}</td>
                            <td>{player.WAR}</td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContentBox>
  );
};
