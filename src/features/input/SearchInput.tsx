import clsx from "clsx";
import { FC } from "react";

interface SearchInputProps {
  placeholder: string;
  value: string;
  className?: string;
  onKeyDown?: () => void;
  onChange?: () => void;
}

export const SearchInput: FC<SearchInputProps> = ({
  onKeyDown,
  onChange,
  value,
  placeholder,
  className,
  ...props
}) => {
  return (
    <input
      type="input"
      value={value}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      className={clsx(
        "w-96 rounded-full border border-gray-300 p-2 px-4 py-2 text-sm focus:border-transparent focus:shadow-md focus:outline-none",
        className
      )}
      {...props}
      onChange={onChange}
    />
  );
};
