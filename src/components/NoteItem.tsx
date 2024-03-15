import React from 'react';
import { Note } from '../types';

interface Props {
  note: Note;
  handleOpen: () => void;
}

const NoteItem: React.FC<Props> = ({ note, handleOpen }) => {
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
        className="note-item-open"
        onClick={() => {
          handleOpen();
        }}
      >
        `{'>'}`
      </button>
    </div>
  );
};

export default NoteItem;
