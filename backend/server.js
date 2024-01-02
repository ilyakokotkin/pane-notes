require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Note = require('./models/Note');
const mongoose = require('mongoose')
const mongoURI = process.env.MONGO_URI;

// Conect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected successfully to the database");
});

const app = express();
app.use(cors());
app.use(express.json());

// API to retrieve notes
app.get('/notes', (req, res) => {
  Note.find({}, (err, notes) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(notes);
    }
  });
});

// API to add a new note
app.post('/notes', (req, res) => {
  const newNote = new Note(req.body);
  newNote.save((err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(newNote);
    }
  });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
