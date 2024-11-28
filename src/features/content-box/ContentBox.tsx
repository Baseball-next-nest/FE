import { FC, ReactNode } from "react";
/* eslint-disable jsx-a11y/anchor-is-valid */
interface PlayerGridTableProps {
  children: ReactNode;
}
export const ContentBox: FC<PlayerGridTableProps> = ({ children }) => {
  return (
    <div className="border border-[#e2e5e8] overflow-hidden relative mx-[9px] my-[9px]  bg-white w-full">
      {children}
    </div>
  );
};
