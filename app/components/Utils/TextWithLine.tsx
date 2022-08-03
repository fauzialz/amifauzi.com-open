import { FC } from "react";

const TextWithLine: FC = ({ children }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="border-t border-gray-400 w-8" />
      <div className="text-center font-medium font-head text-gray-600 italic mx-3">
        {children}
      </div>
      <div className="border-t border-gray-400 w-8" />
    </div>
  );
};

export default TextWithLine;
