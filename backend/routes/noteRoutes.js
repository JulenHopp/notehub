const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');

router.post('/', noteController.createNote); // Crear nota
router.get('/active', noteController.getActiveNotes); // Obtener todas las notas no archivadas con filtro opcional por categoría
router.get('/archived', noteController.getArchivedNotes); // Obtener todas las notas archivadas
router.patch('/:id/archive', noteController.toggleArchiveNote); // Archivar o desarchivar una nota
router.put('/:id', noteController.updateNote); // Actualizar una nota
router.delete('/:id', noteController.deleteNote); // Eliminar una nota
router.get('/categories', noteController.getCategories);
router.post('/categories', noteController.addCategory);
router.delete('/categories/:id', noteController.deleteCategory);

module.exports = router;
