import React, { useState, useEffect } from 'react';

function TextPane() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ text: '', x: 0, y: 0 });
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'

  // Fetch notes from the backend when the component mounts
  useEffect(() => {
    fetch(`${backendUrl}/notes`)
    .then(response => response.json())
      .then(data => setNotes(data))
      .catch(error => {
        console.error('Error fetching notes:', error);
      });
  }, [backendUrl]);

  // Handle click to create a new note
  const handlePaneClick = (e) => {
    const x = e.pageX;
    const y = e.pageY;
    setNewNote({ ...newNote, x, y });
  };

  // Save the note to the backend
  const saveNote = () => {
    const trimmedText = newNote.text.trim();
    if (trimmedText) {
      const optimisticNoteId = Date.now();
      const optimisticNote = { ...newNote, id: optimisticNoteId };
      setNotes(prevNotes => [...prevNotes, optimisticNote]);

      fetch(`${backendUrl}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote),
      })
      .then( resposne => {
        if (!response.ok) {
          throw new Error('Network resposne was not ok');
        }
        return response.json();
      })
      .then(savedNote => {
        setNotes(prevNotes = prevNotes.map(note => note.id === optimisticNoteId ? savedNote : note
          ));
      })
      .catch(error => {
        console.error('Error saving note:', error);
        setNotes(prevNotes => prevNotes.filter(note => note.id !== optimisticNoteId));
      });

      setNewNote({ text: '', x: 0, y: 0});
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
