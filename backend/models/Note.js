const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  text: String,
  x: Number,
  y: Number
}, { timestamps: true });

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
