import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import CategoryDropdown from '../categoryDropdown/CategoryDropdown';
import './NoteModal.css';

Modal.setAppElement('#root'); // Asegúrate de que el modal pueda ser accesible

const NoteModal = ({ isOpen, onRequestClose, onSubmit, note, isEditMode }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    if (note) {
      setTitle(note.title || '');
      setContent(note.content || '');
      setSelectedCategories(note.categories.map(category => category.name) || []);
    }
  }, [note]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar el comportamiento predeterminado del formulario
    const noteData = {
      title,
      content,
      categories: selectedCategories
    };
    await onSubmit(noteData);
    onRequestClose(); // Cerrar el modal después de enviar la nota
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={isEditMode ? "Edit Note" : "Create New Note"}
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2>{isEditMode ? "Edit Note" : "Create New Note"}</h2>
      <form onSubmit={handleSubmit}>
        <div className='modal-field'>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='modal-field'>
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">{isEditMode ? "Save Changes" : "Create Note"}</button>
      </form>
      <CategoryDropdown
        selectedCategories={selectedCategories}
        onCategoryChange={handleCategoryChange}
      />
    </Modal>
  );
}

export default NoteModal;
