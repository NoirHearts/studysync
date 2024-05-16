import React, { useEffect, useState } from 'react';
import noteService from '../services/note';
import { Note } from '../types';
import './Notes/Notes.css';
import { saveCooldown } from '../constants';

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

  useEffect(() => {
    if (note !== null) {
      setNoteTitle(note.title);
      setNoteContent(note.content);
    }
  }, [note]);

  useEffect(() => {
    const timeoutId = setTimeout(saveNote, saveCooldown);

    return () => clearTimeout(timeoutId);
  }, [noteTitle, noteContent]);

  const saveNote = async () => {
    try {
      if (note === null) {
        if (noteTitle === '' && noteContent === '') return;

        const createdNote = await noteService.create({
          title: noteTitle,
          content: noteContent,
        });

        handleCreate(createdNote);
      } else if (note !== null && noteTitle === '' && noteContent === '') {
        const deletedNote = await noteService.remove(note.id);

        handleDelete(deletedNote);
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
      alert('Error Saving Note');
    }
  };

  return (
    <div className="note-editor-container">
      <div className="note-editor-header">
        <input
          id="note-editor-title-input"
          placeholder="Note title"
          spellCheck={false}
          value={noteTitle}
          onChange={(event) => setNoteTitle(event.target.value)}
        ></input>
        <button
          id="note-editor-back"
          onClick={async () => {
            await saveNote();
            handleBack();
          }}
        ></button>
        {note !== null && (
          <button
            id="note-editor-delete"
            onClick={async () => {
              if (
                window.confirm('Are you sure you want to delete this note?')
              ) {
                try {
                  const deletedNote = await noteService.remove(note.id);
                  handleDelete(deletedNote);
                  handleBack();
                } catch (err) {
                  console.error(err);
                  alert('Error Deleting Note');
                }
              }
            }}
          ></button>
        )}
      </div>
      <hr />
      <textarea
        id="note-editor-content-input"
        placeholder="Note content"
        spellCheck={false}
        value={noteContent}
        onChange={(event) => setNoteContent(event.target.value)}
      ></textarea>
    </div>
  );
};

export default NoteEditor;
