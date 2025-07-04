import React, { useState } from "react";
import Sidebar from "./Components/Sidebar";
import Topbar from "./Components/Topbar";
import Editor from "./Components/Editor";
import { FiPlus } from "react-icons/fi";
import { v4 as uuidv4 } from 'uuid';



const App = () => {
  const [notes, setNotes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [editingId, setEditingId] = useState(null);


  const handleAddNote = () => {
    const newNote = {
      id: uuidv4(),
      title: "",
      content: "",
    };
    setNotes((prev) => [newNote, ...prev]);
    setSelectedId(newNote.id); // Select it immediately
    setEditingId(newNote.id);  // Start editing immediately
    return newNote.id;
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
        editingId={editingId}
        setEditingId={setEditingId}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <div className="flex-1 bg-black text-white/90 overflow-y-auto">
          {currentNote ? (
            <Editor key={currentNote.id} />
          ) : (
            <div className="text-center text-4xl font-semibold mt-20">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-200 to-red-600">Phermacon</span><br />
              Click here <span className="inline-block pt-2"><FiPlus className="text-red-600" onClick={(e) => {
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
