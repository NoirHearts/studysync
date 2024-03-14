import React, { useEffect, useState } from 'react';
import './Notes.css';
import noteService from '../../services/note';
import { Note } from '../../types';
import NoteItem from '../NoteItem';

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [noteTitle, setNoteTitle] = useState<string>('');
  const [noteContent, setNoteContent] = useState<string>('');

  useEffect(() => {
    async function fetchData() {
      try {
        const items = await noteService.getAll();
        setNotes(items);
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, []);

  const handleAddNote = async () => {
    try {
      const createdNote = await noteService.create({
        title: noteTitle,
        content: noteContent,
      });
      setNotes([...notes, createdNote]);
      setNoteTitle('');
      setNoteContent('');
    } catch (err) {
      console.error(err);
    }
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
              handleDelete={async () => {
                try {
                  await noteService.remove(note.id);
                  setNotes(notes.filter((el) => el.id !== note.id));
                } catch (err) {
                  console.error(err);
                }
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
