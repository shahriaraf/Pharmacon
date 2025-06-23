import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MdDragIndicator } from "react-icons/md";
import { FiX } from "react-icons/fi";

const Sortable = ({ id, type, onUpdate, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const [isHovered, setIsHovered] = useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const baseStyle = "w-full bg-transparent text-white outline-none";

  const renderBlock = () => {
    if (type === "heading") {
      return (
        <input
          type="text"
          onChange={(e) => onUpdate(id, e.target.value)}
          placeholder="Heading"
          className={`text-2xl font-bold ${baseStyle}`}
        />
      );
    }

    if (type === "paragraph") {
      return (
        <textarea
          onChange={(e) => onUpdate(id, e.target.value)}
          placeholder="Paragraph"
          className={`${baseStyle}`}
        />
      );
    }

   if (type === "image") {
  return (
    <input
      type="file"
      accept="image/*"
      onChange={(e) => {
        const file = e.target.files[0];
        if (file) {
          const imageUrl = URL.createObjectURL(file);
          onUpdate(id, imageUrl);
        }
      }}
      className="text-sm text-gray-300 file:bg-gray-700 file:text-white file:px-3 file:py-1 file:rounded file:border-0 file:cursor-pointer"
    />
  );
}

    if (type === "youtube") {
      return (
        <input
          type="text"
          onChange={(e) => onUpdate(id, e.target.value)}
          placeholder="YouTube Embed URL"
          className={`${baseStyle} underline text-red-300`}
        />
      );
    }

    return null;
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="rounded-md shadow-sm px-4 py-2 mb-4 bg-[#1e1e1e]"
    >
      <div className="flex items-center gap-3">
        {/* Drag handle */}
        <div {...attributes} {...listeners} className="cursor-grab text-gray-500 hover:text-white">
          <MdDragIndicator size={20} />
        </div>

        {/* Block Content */}
        <div className="flex-1">{renderBlock()}</div>

        {/* Delete button */}
        {isHovered && (
          <FiX
            onClick={() => onDelete(id)}
            className="text-gray-400 hover:text-red-500 cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default Sortable;
