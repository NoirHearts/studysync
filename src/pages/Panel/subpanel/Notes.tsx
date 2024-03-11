import React, { useEffect, useState } from 'react';
import './Notes.css';
import noteService from '../../../services/note';
import { Note } from '../../../types';
import NoteItem from './NoteItem';

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [noteTitle, setNoteTitle] = useState<string>('');
  const [noteContent, setNoteContent] = useState<string>('');

  useEffect(() => {
    try {
      noteService.getAll((items) => {
        setNotes(items);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleAddNote = () => {
    noteService.create(
      {
        title: noteTitle,
        content: noteContent,
      },
      (note) => {
        setNotes([...notes, note]);
        setNoteTitle('');
        setNoteContent('');
      }
    );
  };

  return (
    <div>
      <button
        id="create-note"
        onClick={() =>
          createModalOpen ? setCreateModalOpen(false) : setCreateModalOpen(true)
        }
      >
        Create note
      </button>{' '}
      <br />
      {createModalOpen && (
        <div className="create-note-form">
          <input
            id="create-note-title"
            placeholder="Note title"
            value={noteTitle}
            onChange={(event) => setNoteTitle(event.target.value)}
          ></input>
          <textarea
            id="create-note-content"
            placeholder="Note content"
            value={noteContent}
            onChange={(event) => setNoteContent(event.target.value)}
          ></textarea>
          <button id="create-note-button" onClick={handleAddNote}>
            Add note
          </button>
        </div>
      )}
      <div className="note-list">
        <h2>List of notes</h2>
        {notes.length > 0 ? (
          notes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              handleDelete={() => {
                noteService.remove(note.id);
                setNotes(notes.filter((el) => el.id !== note.id));
              }}
            ></NoteItem>
          ))
        ) : (
          <p>No notes yet. Try creating one.</p>
        )}
      </div>
    </div>
  );
};

export default Notes;
