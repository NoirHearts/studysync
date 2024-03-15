import React, { useEffect, useState } from 'react';
import './Notes.css';
import noteService from '../../services/note';
import { Note } from '../../types';
import NoteItem from '../NoteItem';

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteEditorOpen, setNoteEditorOpen] = useState<boolean>(false);
  const [noteTitle, setNoteTitle] = useState<string>('');
  const [noteContent, setNoteContent] = useState<string>('');
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const saveCooldown = 1000;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await noteService.getAll();
        setNotes(items);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!noteEditorOpen) return;

    const saveNote = async () => {
      try {
        if (currentNote === null) {
          if (noteTitle === '' && noteContent === '') return;

          const createdNote = await noteService.create({
            title: noteTitle,
            content: noteContent,
          });
          setNotes([...notes, createdNote]);
          setCurrentNote(createdNote);
        } else {
          const updatedNote = await noteService.update(currentNote.id, {
            title: noteTitle,
            content: noteContent,
          });
          if (updatedNote === null) throw new Error('Could not find note id.');
          const updatedNotes = notes.map((n) =>
            n.id === updatedNote.id ? updatedNote : n
          );
          setNotes(updatedNotes);
          setCurrentNote(updatedNote);
        }
      } catch (err) {
        console.error(err);
      }
    };

    const timeoutId = setTimeout(saveNote, saveCooldown);

    return () => clearTimeout(timeoutId);
  }, [noteTitle, noteContent]);

  return (
    <div>
      {noteEditorOpen ? (
        <div className="note-editor-container">
          <input
            id="note-title-input"
            placeholder="Note title"
            value={noteTitle}
            onChange={(event) => setNoteTitle(event.target.value)}
          ></input>
          <textarea
            id="note-content-input"
            placeholder="Note content"
            value={noteContent}
            onChange={(event) => setNoteContent(event.target.value)}
          ></textarea>
          {currentNote !== null && (
            <button
              id="note-editor-delete"
              onClick={async () => {
                try {
                  await noteService.remove(currentNote.id);
                  setNotes(notes.filter((el) => el.id !== currentNote.id));
                  setNoteEditorOpen(false);
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              Delete
            </button>
          )}

          <button
            id="note-editor-back"
            onClick={() => {
              setCurrentNote(null);
              setNoteEditorOpen(false);
            }}
          >
            Back
          </button>
        </div>
      ) : (
        <div>
          <div className="search-note-container">
            <input
              className="search-note-input"
              type="text"
              placeholder="Search for a note..."
            ></input>
            <button className="search-note-button">🔎</button>
          </div>
          <br />
          <div className="note-list-container">
            {notes.length > 0 ? (
              notes.map((note) => (
                <NoteItem
                  key={note.id}
                  note={note}
                  handleOpen={() => {
                    setCurrentNote(note);
                    setNoteTitle(note.title);
                    setNoteContent(note.content);
                    setNoteEditorOpen(true);
                  }}
                ></NoteItem>
              ))
            ) : (
              <p>No notes yet. Try creating one.</p>
            )}
          </div>
          <button
            className="create-note-button"
            onClick={() => {
              setCurrentNote(null);
              setNoteTitle('');
              setNoteContent('');
              setNoteEditorOpen(true);
            }}
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default Notes;
