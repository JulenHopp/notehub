import React, { useState, useEffect } from 'react';
import ArchiveNotesButton from '../../components/actionbuttons/ArchiveButton';
import NoteCard from '../../components/noteCard/NoteCard';
import { getArchivedNotes } from '/src/api.js';

const ArchivedNotes = () => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const fetchedNotes = await getArchivedNotes();
      setNotes(fetchedNotes);
    } catch (error) {
      console.error('Error fetching archived notes', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleUpdate = () => {
    fetchNotes();
  };

  return (
    <div>
      <div className='action-buttons-container'>
        <ArchiveNotesButton />
      </div>
      <div className='container'>
        <div className='notes-container'>
          {notes.map(note => (
            <NoteCard key={note.id} note={note} onUpdate={handleUpdate} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ArchivedNotes;
