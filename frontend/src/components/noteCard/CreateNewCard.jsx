import React, { useState } from 'react';
import NewNoteImage from '../../assets/newNoteImage.png';
import NoteModal from '../noteModal/NoteModal';
import { createNote } from '/src/api.js';
import './NoteCard.css';

const CreateNewCard = ({ onNoteCreated }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleCreateNote = async (noteData) => {
    try {
      await createNote(noteData);
      onNoteCreated();
      closeModal();
    } catch (error) {
      console.error('Error creating note', error);
    }
  };

  return (
    <div>
      <div className='card-container create-new-note-card-container' onClick={openModal}>
        <img src={NewNoteImage} alt="Plus image" className='create-new-note-card-image'/>
      </div>
      <NoteModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        onSubmit={handleCreateNote}
        isEditMode={false}
        note={{ title: '', content: '', categories: [] }} // Pasar una nota vacía para reiniciar los campos
      />
    </div>
  );
}

export default CreateNewCard;
