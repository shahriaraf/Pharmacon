import React, { useState } from "react";
import {
  FiHome,
  FiInbox,
  FiBook,
  FiFileText,
  FiTrash2,
  FiSearch,
  FiPlus,
  FiEdit2,
  FiX,
} from "react-icons/fi";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { FaBookMedical } from "react-icons/fa";

const Sidebar = ({ notes, onAddNote, onSelectNote, onRenameNote, onDeleteNote, selectedId }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [bgColor, setBgColor] = useState('bg-black');

  const handleChange = () => {
    setBgColor(prev => prev === 'bg-black' ? 'bg-blue-900' : 'bg-black');
  };

  return (
    <aside className="w-60 bg-gray-900 text-white/90 h-screen py-6 px-4 border-r border-gray-800 flex flex-col">
      <div className="text-xl font-semibold mb-6 px-2 flex items-center gap-2  "><FaBookMedical className="text-red-400" /><p className="text-transparent bg-clip-text bg-gradient-to-r from-red-800 via-red-500 to-red-300">Pharmacon</p></div>

      <div className="relative mb-6">
        <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-10 pr-3 py-2 bg-[#1e1e1e] border border-gray-700 rounded text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <nav className="flex flex-col space-y-3 text-sm">
        <SidebarItem icon={<FiHome />} label="Home" />
        <SidebarItem icon={<FiInbox />} label="Inbox" />
        <SidebarItem icon={<HiOutlineAcademicCap />} label="Student Planner" />
        <SidebarItem icon={<FiFileText />} label="Research Paper Planner" />
        <SidebarItem icon={<FiBook />} label="Class Notes" />
        <SidebarItem icon={<FiTrash2 />} label="Trash" />

        {/* Notes Header */}
        <div
          className="relative group flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 justify-between"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="flex items-center gap-2">
            <FiEdit2 />
            <span>Notes</span>
          </div>
          {isHovering && (
            <FiPlus
              className="text-gray-400 hover:text-white cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onAddNote();
              }}
            />
          )}
        </div>

        {/* Notes List */}
        <div className="ml-5 mt-1 space-y-1">
          {notes.map((note) => (
            <div
              key={note.id}
              className={`group flex items-center justify-between text-sm px-2 py-1 rounded cursor-pointer ${
                note.id === selectedId ? "bg-gray-700" : "hover:bg-gray-800"
              }`}
            >
              {editingId === note.id ? (
                <input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  onBlur={() => {
                    onRenameNote(note.id, newTitle);
                    setEditingId(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onRenameNote(note.id, newTitle);
                      setEditingId(null);
                    }
                  }}
                  onClick={handleChange}
                  className={`w-full ${bgColor} outline-none text-white text-sm`}
                  autoFocus
                />
              ) : (
                <span
                  onClick={() => onSelectNote(note.id)}
                  onDoubleClick={() => {
                    setEditingId(note.id);
                    setNewTitle(note.title);
                  }}
                  className="truncate"
                >
                  {note.title}
                </span>
              )}

              <FiX
                onClick={() => onDeleteNote(note.id)}
                className="text-gray-400 group-hover:text-red-400 ml-2 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </nav>
    </aside>
  );
};

const SidebarItem = ({ icon, label }) => (
  <div className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 cursor-pointer">
    <div className="text-lg">{icon}</div>
    <span>{label}</span>
  </div>
);

export default Sidebar;
