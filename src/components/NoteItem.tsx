import React from 'react';
import { Note } from '../types';
import noteService from '../services/note';

interface Props {
  note: Note;
  handleOpen: () => void;
  handleDelete: (note: Note) => void;
}

const NoteItem: React.FC<Props> = ({ note, handleOpen, handleDelete }) => {
  return (
    <div key={note.id} className="note-item">
      <div
        className="note-item-info"
        onClick={() => {
          handleOpen();
        }}
      >
        <h3 className="note-item-title">{note.title}</h3>
        <div className="note-item-content">
          {note.content.split('\n').map((paragraph) => (
            <>
              {paragraph}
              <br />
            </>
          ))}
        </div>
      </div>
      <button
        className="note-item-open"
        onClick={() => {
          handleOpen();
        }}
      ></button>
      <button
        className="note-item-delete"
        onClick={async () => {
          try {
            const deletedNote = await noteService.remove(note.id);
            handleDelete(deletedNote);
          } catch (err) {
            console.error(err);
          }
        }}
      ></button>
    </div>
  );
};

export default NoteItem;
