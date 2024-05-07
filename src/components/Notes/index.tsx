import React, { useEffect, useState } from 'react';
import './Notes.css';
import noteService from '../../services/note';
import { Note } from '../../types';
import NoteItem from '../NoteItem';
import NoteEditor from '../NoteEditor';

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteEditorOpen, setNoteEditorOpen] = useState<boolean>(false);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [searchString, setSearchString] = useState<string>('');

  useEffect(() => {
    const retrieveNotes = async () => {
      try {
        const items = await noteService.getAll();
        setNotes(items);
      } catch (e) {
        console.error(e);
      }
    };
    retrieveNotes();
  }, []);

  const createHandler = (createdNote: Note) => {
    setCurrentNote(createdNote);
    setNotes([...notes, createdNote]);
  };

  const updateHandler = (updatedNote: Note) => {
    setCurrentNote(updatedNote);
    setNotes(notes.map((n) => (n.id === updatedNote.id ? updatedNote : n)));
  };

  const deleteHandler = (deletedNote: Note) => {
    setCurrentNote(null);
    setNotes(notes.filter((n) => n.id !== deletedNote.id));
  };

  const backHandler = () => {
    setCurrentNote(null);
    setNoteEditorOpen(false);
  };

  const openNoteEditor = (note: Note | null) => {
    setCurrentNote(note);
    setNoteEditorOpen(true);
  };

  return (
    <div>
      {noteEditorOpen ? (
        <NoteEditor
          note={currentNote}
          handleCreate={createHandler}
          handleUpdate={updateHandler}
          handleDelete={deleteHandler}
          handleBack={backHandler}
        />
      ) : (
        <div>
          <div className="search-note-container">
            <input
              className="search-note-input"
              type="text"
              placeholder="Search for a note..."
              onChange={(event) => setSearchString(event.target.value)}
            ></input>
            <button className="search-note-button">🔎</button>
          </div>
          <div className="note-content-container">
            <div className="note-list-container">
              {notes.length > 0 ? (
                notes
                  .filter(
                    (note) =>
                      note.title.includes(searchString) ||
                      note.content.includes(searchString)
                  )
                  .sort(
                    (a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt)
                  )
                  .map((note) => (
                    <NoteItem
                      key={note.id}
                      note={note}
                      handleOpen={() => {
                        openNoteEditor(note);
                      }}
                      handleDelete={deleteHandler}
                    ></NoteItem>
                  ))
              ) : (
                <p className="notes-no-message">
                  No notes yet. Try creating one.
                </p>
              )}
            </div>
            <button
              id="create-note-button"
              onClick={() => {
                openNoteEditor(null);
              }}
            ></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;
