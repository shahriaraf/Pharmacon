import React from "react";
import { FiLock, FiShare2, FiMessageSquare, FiMoreHorizontal, FiStar } from "react-icons/fi";

const Topbar = () => {
  return (
    <div className="flex justify-between items-center px-6 py-3 bg-black text-white/90">
      {/* Left: Page Icon + Title + Status */}
      <div className="flex items-center gap-3">
        <span className="text-xl">👋</span>
        <h1 className="text-lg font-semibold">Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-800 via-red-500 to-red-300">Pharmacon</span></h1>
        <div className="flex items-center text-sm text-gray-400 gap-1">
          <FiLock size={14} />
          <span>Private ▾</span>
        </div>
      </div>

      {/* Right: Action buttons */}
      <div className="flex items-center gap-4 text-gray-400">
        <button className="hover:text-white"><FiShare2 /></button>
        <button className="hover:text-white"><FiMessageSquare /></button>
        <button className="hover:text-white"><FiStar /></button>
        <button className="hover:text-white"><FiMoreHorizontal /></button>
      </div>
    </div>
  );
};

export default Topbar;
