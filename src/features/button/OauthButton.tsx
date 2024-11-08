import { FC, ReactNode } from "react";
/* eslint-disable jsx-a11y/anchor-is-valid */
interface OauthButtonProps {
  children: ReactNode;
  type: string;
}
export const OauthButton: FC<OauthButtonProps> = ({ children }) => {
  return (
    <button
      type={type}
      className="cursor-pointer appearance-none text-left no-underline box-border relative rounded-lg p-0 leading-[1] flex items-center justify-center h-[2.75rem] min-h-[2.75rem] w-[2.75rem] min-w-[2.75rem] border border-transparent bg-[rgb(241,243,245)] text-white shadow-[0px_1px_2px_rgba(0,0,0,0.2)]"
    >
      {children}
    </button>
  );
};
