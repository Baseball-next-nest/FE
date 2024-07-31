"use client";
import Link from "next/link";
import { FC, ReactNode } from "react";
/* eslint-disable jsx-a11y/anchor-is-valid */
interface TableProps {
  children: ReactNode;
  hitter: any[];
  pitcher: any[];
}

export const Table: FC<TableProps> = ({ children, hitter, pitcher }) => {
  return (
    // box
    <div className="mb-8 rounded-md border-gray-200 relative overflow-hidden ">
      {/* head */}
      <div className="relative text-md p-4 cursor-pointer font-semibold text-white bg-[#e11956]">
        {children}
      </div>
      {/* content */}
      <div className="w-full h-auto bg-white">
        <div className="relative overflow-x-auto h-128">
          {/* Table을 다른 컴포넌트로 빼야하나? */}
          <table className="w-full whitespace-nowrap table-auto">
            <thead>
              {/* 타자 */}
              {hitter && (
                <tr className="*:sticky *:top-0 *:bg-[#EFEFEF] *:text-sm *:p-4 *:align-middle *:text-center *:min-w-8 *:font-medium *:border-b *:border-[#E7E7E7]">
                  <th className="left-0 z-20 bg-[#EFEFEF]">순위</th>
                  <th className="left-[3.6rem] z-20 bg-[#EFEFEF]">이름</th>
                  <th>WAR</th>
                  <th>타율</th>
                  <th>안타</th>
                  <th>2루타</th>
                  <th>3루타</th>
                  <th>홈런</th>
                  <th>출루율</th>
                  <th>장타율</th>
                  <th>OPS</th>
                  <th>WRC+</th>
                </tr>
              )}
              {/* 투수 */}
              {pitcher && (
                <tr className="*:sticky *:top-0 *:bg-[#EFEFEF] *:text-sm *:p-4 *:align-middle *:text-center *:min-w-8 *:font-medium *:border-b *:border-[#E7E7E7]">
                  <th className="left-0 z-20 bg-[#EFEFEF]">순위</th>
                  <th className="left-[3.6rem] z-20 bg-[#EFEFEF]">이름</th>
                  <th>WAR</th>
                  <th>평균자책</th>
                  <th>경기수</th>
                  <th>이닝</th>
                  <th>승</th>
                  <th>패</th>
                  <th>탈삼진</th>
                  <th>WHIP</th>
                  <th>FIP</th>
                </tr>
              )}
            </thead>
            <tbody>
              {/* 타자 */}
              {hitter &&
                hitter.map((hit, index) => (
                  <tr className="*:p-2 *:text-center *:text-xs" key={index}>
                    <td className="bg-white sticky left-0 z-10">{index + 1}</td>
                    <td className="*:font-semibold bg-white sticky left-[3.6rem] z-10">
                      <Link
                        href={{
                          pathname: "/player/detail",
                          query: { id: hit.id },
                        }}
                      >
                        {hit.name}
                      </Link>
                    </td>
                    <td>{hit.WAR}</td>
                    <td>{hit.AVG}</td>
                    <td>{hit.H}</td>
                    <td>{hit["2B"]}</td>
                    <td>{hit["3B"]}</td>
                    <td>{hit.HR}</td>
                    <td>{hit.OBP}</td>
                    <td>{hit.SLG}</td>
                    <td>{hit.OPS}</td>
                    <td>{hit.WRC}</td>
                  </tr>
                ))}
              {/* 투수 */}
              {pitcher &&
                pitcher.map((pit, index) => (
                  <tr className="*:p-2 *:text-center *:text-xs" key={index}>
                    <td className="bg-white sticky left-0 z-10">{index + 1}</td>
                    <td className="*:font-semibold bg-white sticky left-[3.6rem] z-10">
                      <Link
                        href={{
                          pathname: "/player/detail",
                          query: { id: pit.id },
                        }}
                      >
                        {pit.name}
                      </Link>
                    </td>
                    <td>{pit.WAR}</td>
                    <td>{pit.ERA}</td>
                    <td>{pit.G}</td>
                    <td>{pit.IP}</td>
                    <td>{pit.W}</td>
                    <td>{pit.L}</td>
                    <td>{pit.p_SO}</td>
                    <td>{pit.WHIP}</td>
                    <td>{pit.FIP}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
