const Note = require('../models/note');

exports.createNote = async (req, res) => {
  try {
    const note = await Note.create(req.body);
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.findAll();
    res.status(200).json(notes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    if (note) {
      res.status(200).json(note);
    } else {
      res.status(404).json({ error: 'Note not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    if (note) {
      await note.update(req.body);
      res.status(200).json(note);
    } else {
      res.status(404).json({ error: 'Note not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    if (note) {
      await note.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Note not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.archiveNote = async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    if (note) {
      note.archived = true;
      await note.save();
      res.status(200).json(note);
    } else {
      res.status(404).json({ error: 'Note not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.unarchiveNote = async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    if (note) {
      note.archived = false;
      await note.save();
      res.status(200).json(note);
    } else {
      res.status(404).json({ error: 'Note not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
