import React, { useState } from "react";
import Sidebar from "./Components/Sidebar";
import Topbar from "./Components/Topbar";
import Editor from "./Components/Editor";
import { FiPlus } from "react-icons/fi";


const App = () => {
  const [notes, setNotes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const handleAddNote = () => {
    const newNote = {
      id: Date.now(),
      title: "Untitled Note",
    };
    setNotes((prev) => [...prev, newNote]);
    setSelectedId(newNote.id);
  };

  const handleSelectNote = (id) => setSelectedId(id);

  const handleRenameNote = (id, newTitle) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, title: newTitle.trim() || "Untitled Note" } : note
      )
    );
  };

  const handleDeleteNote = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
    if (selectedId === id) {
      setSelectedId(null);
    }
  };

  const currentNote = notes.find((note) => note.id === selectedId);

  return (
    <div className="flex h-screen">
      <Sidebar
        notes={notes}
        onAddNote={handleAddNote}
        onSelectNote={handleSelectNote}
        onRenameNote={handleRenameNote}
        onDeleteNote={handleDeleteNote}
        selectedId={selectedId}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <div className="flex-1 bg-black text-white/90 overflow-y-auto">
          {currentNote ? (
            <Editor key={currentNote.id} />
          ) : (
            <div className="text-center text-4xl font-semibold mt-20">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-800 via-red-500 to-red-300">Phermacon</span><br />
               Click here <span className="inline-block pt-2"><FiPlus className="text-white" onClick={(e) => {
                e.stopPropagation();
               (handleAddNote())
              }}></FiPlus></span> to create a note
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
