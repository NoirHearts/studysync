import React from 'react';
import { Note } from '../../../types';

interface Props {
  note: Note;
  handleDelete: (note: Note) => void;
}

const NoteItem: React.FC<Props> = ({ note, handleDelete }) => {
  return (
    <div key={note.id} className="note-item">
      <h3>{note.title}</h3>
      <p>
        {note.content.split('\n').map((paragraph, index) => (
          <span key={index}>
            {paragraph}
            <br />
          </span>
        ))}
      </p>

      <button
        className="note-item-delete"
        onClick={() => {
          handleDelete(note);
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default NoteItem;
