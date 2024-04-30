const express = require('express');
const Note = require('../models/note');
const router = express.Router();

// Get all notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new note
router.post('/', async (req, res) => {
  const note = new Note({
    title: req.body.title,
    content: req.body.content,
  });
  try {
    const newNote = await note.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a note
router.patch('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Cannot find note' });
    }
    if (req.body.title) {
      note.title = req.body.title;
    }
    if (req.body.content) {
      note.content = req.body.content;
    }
    note.updatedAt = new Date();
    const updatedNote = await note.save();
    res.status(200).json(updatedNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a note
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Cannot find note' });
    }
    await note.remove();
    res.status(200).json({ message: 'Deleted Note' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;