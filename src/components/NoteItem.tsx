import React from 'react';
import { Note } from '../types';

interface Props {
  note: Note;
  handleOpen: () => void;
  handleDelete: () => void;
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
        onClick={() => {
          handleDelete();
        }}></button>
    </div>
  );
};

export default NoteItem;
