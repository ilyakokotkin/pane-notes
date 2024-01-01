// backend/server.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory storage for text snippets
let notes = [];

// API to retrieve notes
app.get('/notes', (req, res) => {
  res.json(notes);
});

// API to add a new note
app.post('/notes', (req, res) => {
  const note = req.body;
  notes.push(note);
  res.status(201).send();
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
