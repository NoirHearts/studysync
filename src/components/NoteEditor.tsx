import React, { useEffect, useState } from 'react';
import noteService from '../services/note';
import { Note } from '../types';

interface Props {
  note: Note | null;
  handleCreate: (note: Note) => void;
  handleUpdate: (note: Note) => void;
  handleDelete: (note: Note) => void;
  handleBack: () => void;
}

const NoteEditor: React.FC<Props> = ({
  note,
  handleCreate,
  handleUpdate,
  handleDelete,
  handleBack,
}) => {
  const [noteTitle, setNoteTitle] = useState<string>('');
  const [noteContent, setNoteContent] = useState<string>('');
  const saveCooldown = 1000;

  useEffect(() => {
    if (note !== null) {
      setNoteTitle(note.title);
      setNoteContent(note.content);
    }
  }, [note]);

  useEffect(() => {
    const saveNote = async () => {
      try {
        if (note === null) {
          if (noteTitle === '' && noteContent === '') return;

          const createdNote = await noteService.create({
            title: noteTitle,
            content: noteContent,
          });

          handleCreate(createdNote);
        } else {
          const updatedNote = await noteService.update(note.id, {
            title: noteTitle,
            content: noteContent,
          });
          if (updatedNote === null) throw new Error('Could not find note id.');

          handleUpdate(updatedNote);
        }
      } catch (err) {
        console.error(err);
      }
    };

    const timeoutId = setTimeout(saveNote, saveCooldown);

    return () => clearTimeout(timeoutId);
  }, [noteTitle, noteContent]);

  return (
    <div className="note-editor-container">
      <div className="note-editor-header">
        <input
          id="note-editor-title-input"
          placeholder="Note title"
          value={noteTitle}
          onChange={(event) => setNoteTitle(event.target.value)}
        ></input>
        {note !== null && (
          <button
            id="note-editor-delete"
            onClick={async () => {
              try {
                const deletedNote = await noteService.remove(note.id);
                handleDelete(deletedNote);
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
          onClick={async () => {
            if (note !== null && noteTitle === '' && noteContent === '') {
              try {
                const deletedNote = await noteService.remove(note.id);
                handleDelete(deletedNote);
              } catch (err) {
                console.error(err);
              }
            }
            handleBack();
          }}
        >
          Back
        </button>
      </div>
      <hr />

      <textarea
        id="note-editor-content-input"
        placeholder="Note content"
        value={noteContent}
        onChange={(event) => setNoteContent(event.target.value)}
      ></textarea>
    </div>
  );
};

export default NoteEditor;
