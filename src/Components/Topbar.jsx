import React from "react";
import {
  FiLock,
  FiShare2,
  FiMessageSquare,
  FiMoreHorizontal,
  FiStar,
} from "react-icons/fi";

const Topbar = () => {
  return (
    <div className="flex flex-wrap justify-between items-center px-4 sm:px-6 py-3 bg-black text-white/90 gap-y-2">
      {/* Left: Page Icon + Title + Status */}
      <div className="flex flex-wrap items-center ml-20 md:ml-0 justify-end gap-2 sm:gap-3">
        <span className="text-xl">👋</span>
        <h1 className="text-base sm:text-lg font-semibold">
          Welcome to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-200 to-red-600">
            Pharmacon
          </span>
        </h1>
        <div className="flex items-center text-sm text-gray-400 gap-1">
          <FiLock size={14} />
          <span className="whitespace-nowrap">Private ▾</span>
        </div>
      </div>

      {/* Right: Action buttons */}
      <div className="md:flex hidden items-center justify-end gap-3 sm:gap-4 text-gray-400 text-base">
        <button className="hover:text-white" title="Share"><FiShare2 /></button>
        <button className="hover:text-white" title="Comment"><FiMessageSquare /></button>
        <button className="hover:text-white" title="Star"><FiStar /></button>
        <button className="hover:text-white" title="More"><FiMoreHorizontal /></button>
      </div>
    </div>
  );
};

export default Topbar;
