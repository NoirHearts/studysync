import React from 'react';
import { Note } from '../types';

interface Props {
  note: Note;
  handleOpen: () => void;
}

const NoteItem: React.FC<Props> = ({ note, handleOpen }) => {
  return (
    <div key={note.id} className="note-item">
      <div className="note-item-info"         onClick={() => {
          handleOpen();}}>
        <h3 className='note-item-title'>{note.title}</h3>
        {/* <p> */}
          {note.content.split('\n').map((paragraph, index) => (
            <div key={index} className='note-item-content'>
              {paragraph}
              <br />
            </div>
          ))}
        {/* </p> */}
      </div>
      <button
        className="note-item-open"
        onClick={() => {
          handleOpen();
        }}
      >
      </button>
    </div>
  );
};

export default NoteItem;
