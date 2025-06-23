import React, { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { v4 as uuidv4 } from "uuid";
import Sortable from "./Sortable";

const Editor = () => {
    const [blocks, setBlocks] = useState([]);

    const addBlock = (type) => {
        const newBlock = {
            id: uuidv4(),
            type,
            content: type === "image" || type === "youtube" ? "" : `New ${type}`,
        };
        setBlocks((prev) => [...prev, newBlock]);
    };

    const handleDeleteBlock = (id) => {
        setBlocks((prev) => prev.filter((block) => block.id !== id));
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            const oldIndex = blocks.findIndex((block) => block.id === active.id);
            const newIndex = blocks.findIndex((block) => block.id === over?.id);
            setBlocks((prev) => arrayMove(prev, oldIndex, newIndex));
        }
    };

    const updateBlock = (id, newContent) => {
        setBlocks((prev) =>
            prev.map((block) =>
                block.id === id ? { ...block, content: newContent } : block
            )
        );
    };

    return (
        <div className="min-h-screen bg-[#1e1e1e] text-white pb-12 pt-20 px-4">
            <div className="max-w-3xl mx-auto">

                <div className="flex flex-wrap gap-3 mb-6 justify-center">
                    {["heading", "paragraph", "image", "youtube"].map((type) => (
                        <button
                            key={type}
                            onClick={() => addBlock(type)}
                            className="px-4 py-2 bg-gray-800 text-white/90 hover:bg-gray-700 border border-gray-600 rounded text-sm capitalize"
                        >
                            Add {type}
                        </button>
                    ))}
                </div>

                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
                        {blocks.map((block) => (
                            <Sortable
                                key={block.id}
                                id={block.id}
                                type={block.type}
                                content={block.content}
                                onUpdate={updateBlock}
                                onDelete={handleDeleteBlock}
                            />
                        ))}
                    </SortableContext>
                </DndContext>
            </div>
        </div>
    );
};

export default Editor;
