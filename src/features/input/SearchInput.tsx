import { FC } from "react";

interface SearchInputProps {
  placeholder: string;
  value: string;
  onKeyDown?: () => void;
  onChange?: () => void;
}

export const SearchInput: FC<SearchInputProps> = ({
  onKeyDown,
  onChange,
  value,
  placeholder,
  ...props
}) => {
  return (
    <input
      type="input"
      value={value}
      placeholder={placeholder}
      onKeyDown={onKeyDown}
      className="w-96 rounded-full border border-gray-300 p-2 px-4 py-2 text-sm focus:border-transparent focus:shadow-md focus:outline-none"
      {...props}
      onChange={onChange}
    />
  );
};
