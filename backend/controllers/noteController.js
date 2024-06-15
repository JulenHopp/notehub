const { Note, Category } = require('../models');

// Crear nota con categorías opcionales
exports.createNote = async (req, res) => {
  try {
    const { title, content, categories } = req.body;
    const note = await Note.create({ title, content });

    if (categories && categories.length > 0) {
      const categoryInstances = await Promise.all(categories.map(async (category) => {
        const [categoryInstance] = await Category.findOrCreate({
          where: { name: category }
        });
        return categoryInstance;
      }));

      await note.setCategories(categoryInstances);
    }

    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todas las notas no archivadas con filtro opcional por categorías
exports.getActiveNotes = async (req, res) => {
  try {
    const { categories } = req.query;

    let notes;
    if (categories) {
      const categoriesArray = categories.split(',');
      notes = await Note.findAll({
        where: { archived: false },
        include: {
          model: Category,
          as: 'categories',
          where: { name: categoriesArray },
          through: { attributes: [] }
        }
      });
    } else {
      notes = await Note.findAll({
        where: { archived: false },
        include: 'categories'
      });
    }

    res.status(200).json(notes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todas las notas archivadas
exports.getArchivedNotes = async (req, res) => {
  try {
    const notes = await Note.findAll({
      where: { archived: true },
      include: 'categories'
    });

    res.status(200).json(notes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Archivar o desarchivar una nota
exports.toggleArchiveNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findByPk(id);

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    note.archived = !note.archived;
    await note.save();

    res.status(200).json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar una nota
exports.updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, categories } = req.body;

    const note = await Note.findByPk(id);

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    note.title = title;
    note.content = content;

    if (categories && categories.length > 0) {
      const categoryInstances = await Promise.all(categories.map(async (category) => {
        const [categoryInstance] = await Category.findOrCreate({
          where: { name: category }
        });
        return categoryInstance;
      }));

      await note.setCategories(categoryInstances);
    } else {
      await note.setCategories([]); // Eliminar todas las relaciones de categorías si no se proporcionan
    }

    await note.save();

    res.status(200).json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar una nota y sus relaciones con categorías
exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findByPk(id);

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    await note.setCategories([]); // Eliminar las relaciones con categorías
    await note.destroy();

    res.status(204).send(); // Respuesta exitosa sin contenido
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching categories' });
  }
};

exports.addCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const newCategory = await Category.create({ name });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: 'Error adding category' });
  }
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await Category.destroy({ where: { id } });
    res.status(204).json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting category' });
  }
};