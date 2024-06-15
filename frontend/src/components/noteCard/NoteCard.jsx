import React, { useState } from 'react';
import NoteModal from '../noteModal/NoteModal';
import './NoteCard.css';
import { updateNote, toggleArchiveNote, deleteNote } from '/src/api.js';

const CreateNewCard = ({ note, onUpdate }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleToggleArchive = async () => {
    try {
      await toggleArchiveNote(note.id);
      onUpdate();
    } catch (error) {
      console.error('Error archiving note', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteNote(note.id);
      onUpdate();
    } catch (error) {
      console.error('Error deleting note', error);
    }
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleUpdateNote = async (noteData) => {
    try {
      await updateNote(note.id, noteData);
      onUpdate();
      closeModal();
    } catch (error) {
      console.error('Error updating note', error);
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className='card-container'>
      <div>
        <div className='hamburger-menu'>
          <button onClick={toggleMenu} className='hamburger-button'>☰</button>
          {showMenu && (
            <div className='menu'>
              <button onClick={handleToggleArchive}>{note.archived ? "Unarchive" : "Archive"}</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          )}
        </div>
      </div>
      <div onClick={openModal} className='card-data-container'>
        <p className='card-title'>{note.title}</p>
        <div>
          <p className='card-text'>{note.content}</p>
        </div>
        <div className='card-category-container'>
          {
            note.categories.map(category => (
              <span key={category.id} className='card-category'>{category.name}</span>
            ))
          }
        </div>
      </div>
      <NoteModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        onSubmit={handleUpdateNote}
        note={note}
        isEditMode={true}
      />
    </div>
  );
}

export default CreateNewCard;
