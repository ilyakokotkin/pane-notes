// frontend/src/TextPane.js
import React, { useState, useEffect } from 'react';

function TextPane() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ text: '', x: 0, y: 0 });

  // Fetch notes from the backend when the component mounts
  useEffect(() => {
    fetch(process.env.REACT_APP_BACKEND_URL + '/notes')
    .then(response => response.json())
      .then(data => setNotes(data));
  }, []);

  // Handle click to create a new note
  const handlePaneClick = (e) => {
    const x = e.pageX;
    const y = e.pageY;
    setNewNote({ ...newNote, x, y });
  };

  // Save the note to the backend
  const saveNote = () => {
    if (newNote.text.trim()) {
      fetch('http://localhost:5000/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote),
      }).then(() => {
        setNotes([...notes, newNote]);
        setNewNote({ text: '', x: 0, y: 0 }); // Reset newNote
      });
    }
  };

  return (
    <div onClick={handlePaneClick} style={{ position: 'relative', width: '100%', height: '100vh', cursor: 'text' }}>
      {notes.map((note, index) => (
        <div key={index} style={{ position: 'absolute', left: note.x, top: note.y, whiteSpace: 'pre-wrap' }}>
          {note.text}
        </div>
      ))}
      {newNote.x !== 0 && (
        <textarea
          style={{ position: 'absolute', left: newNote.x, top: newNote.y }}
          value={newNote.text}
          onChange={(e) => setNewNote({ ...newNote, text: e.target.value })}
          onBlur={saveNote}
          autoFocus
        />
      )}
    </div>
  );
}

export default TextPane;
