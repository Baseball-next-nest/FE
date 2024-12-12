import { FC, ReactNode } from "react";
/* eslint-disable jsx-a11y/anchor-is-valid */
interface CommunityBoxProps {
  children: ReactNode;
}
export const CommunityBox: FC<CommunityBoxProps> = ({ children }) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="basic-container !w-3/5 !gap-2 flex-col items-center justify-center text-black">
        {children}
      </div>
    </main>
  );
};
