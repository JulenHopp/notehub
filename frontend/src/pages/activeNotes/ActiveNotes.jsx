import React, { useState, useEffect } from 'react';
import ArchiveNotesButton from '../../components/actionbuttons/ArchiveButton';
import FilterButton from '../../components/actionbuttons/FilterButton';
import CreateNewCard from '../../components/noteCard/CreateNewCard';
import NoteCard from '../../components/noteCard/NoteCard';
import { getActiveNotes } from '/src/api.js';
import './ActiveNotes.css';

const ActiveNotes = () => {
  const [notes, setNotes] = useState([]);
  const [filter, setFilter] = useState('');

  const fetchNotes = async (filter) => {
    try {
      const fetchedNotes = await getActiveNotes(filter);
      setNotes(fetchedNotes);
    } catch (error) {
      console.error('Error fetching active notes', error);
    }
  };

  useEffect(() => {
    fetchNotes(filter);
  }, [filter]);

  const handleUpdate = () => {
    fetchNotes(filter);
  };

  const handleNoteCreated = () => {
    fetchNotes(filter);
  };

  return (
    <div>
      <div className='action-buttons-container'>
        <FilterButton onFilter={setFilter} />
        <ArchiveNotesButton />
      </div>
      <div className='container'>
        <div className='notes-container'>
          {notes.map(note => (
            <NoteCard key={note.id} note={note} onUpdate={handleUpdate}/>
          ))}
          <CreateNewCard onNoteCreated={handleNoteCreated} />
        </div>
      </div>
    </div>
  );
}

export default ActiveNotes;
