import React, { FC, ReactNode } from "react";
import { ContentBox } from "../content-box/ContentBox";
/* eslint-disable jsx-a11y/anchor-is-valid */
interface PlayerGridTableProps {
  children: ReactNode;
  player: any[];
}
export const PlayerGridTable: FC<PlayerGridTableProps> = ({
  player,
  children,
}) => {
  const playerType = player.group === "P" ? "pitcher" : "hitter";

  return (
    <ContentBox>
      {/* season */}
      <div className="flex items-center h-12 px-[5px] pl-[18px] border-b border-[#ecf0f2]">
        <h3 className="overflow-hidden text-ellipsis whitespace-nowrap text-[17px] font-bold text-black">
          {children}
        </h3>
      </div>
      <div className=" p-4.5">
        <div className="table w-full box-border border-collapse mb-3">
          {player && playerType === "pitcher"
            ? player.season.map((pit, index: number) => (
                <React.Fragment key={index}>
                  <ul className="grid-table table-row w-full table-fixed text-center">
                    <li>
                      <strong>평균자책</strong>
                      <span>{pit.ERA}</span>
                    </li>
                    <li>
                      <strong>승-패</strong>
                      <span>
                        {pit.W}-{pit.L}
                      </span>
                    </li>
                    <li>
                      <strong>이닝</strong>
                      <span>{pit.IP}</span>
                    </li>
                    <li>
                      <strong>삼진</strong>
                      <span>{pit.SO}</span>
                    </li>
                  </ul>
                  <ul className="grid-table table-row w-full table-fixed text-center">
                    <li>
                      <strong>피안타</strong>
                      <span>{pit.H}</span>
                    </li>
                    <li>
                      <strong>피홈런</strong>
                      <span>{pit.HR}</span>
                    </li>
                    <li>
                      <strong>볼넷</strong>
                      <span>{pit.BB}</span>
                    </li>
                    <li>
                      <strong>WHIP</strong>
                      <span>{pit.WHIP}</span>
                    </li>
                  </ul>
                </React.Fragment>
              ))
            : player.season.map((hit, index: number) => (
                <React.Fragment key={index}>
                  <ul className="grid-table table-row w-full table-fixed text-center">
                    <li>
                      <strong>타율</strong>
                      <span>{hit.AVG}</span>
                    </li>
                    <li>
                      <strong>홈런</strong>
                      <span>{hit.HR}</span>
                    </li>
                    <li>
                      <strong>안타</strong>
                      <span>{hit.H}</span>
                    </li>
                    <li>
                      <strong>타점</strong>
                      <span>{hit.RBI}</span>
                    </li>
                  </ul>
                  <ul className="grid-table table-row w-full table-fixed text-center">
                    <li>
                      <strong>득점</strong>
                      <span>{hit.R}</span>
                    </li>
                    <li>
                      <strong>도루</strong>
                      <span>{hit.SB}</span>
                    </li>
                    <li>
                      <strong>출루율</strong>
                      <span>{hit.OBP}</span>
                    </li>
                    <li>
                      <strong>OPS</strong>
                      <span>{hit.OPS}</span>
                    </li>
                  </ul>
                </React.Fragment>
              ))}
        </div>
      </div>
    </ContentBox>
  );
};
