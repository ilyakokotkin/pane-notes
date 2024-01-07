require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Note = require('./models/Note');
const mongoose = require('mongoose')
const mongoURI = process.env.MONGO_URI;

// Initialize the express application
const app = express();
app.use(cors());
app.use(express.json());

// Conect to MongoDB
mongoose.connect(mongoURI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected successfully to the database");
});

// API to retrieve notes
app.get('/notes', async (req, res) => {
  try {
    const notes = await Note.find({});
    res.json(notes);
  } catch (err) {
    res.status(500).send(err);
  }
});


// API to add a new note
app.post('/notes', (req, res) => {
  const newNote = new Note(req.body);
  newNote.save()
    .then(savedNote => {
      res.status(201).send(savedNote);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
