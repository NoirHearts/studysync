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
          try {
            handleOpen();
          } catch (err) {
            console.error(err);
            alert('Error Opening Note');
          }
        }}
      >
        <h3 className="note-item-title">{note.title}</h3>
        <div className="note-item-content">
          {note.content.split('\n').map((paragraph, index) => (
            <React.Fragment key={index}>
              {paragraph}
              <br />
            </React.Fragment>
          ))}
        </div>
      </div>
      <button
        className="note-item-open"
        onClick={() => {
          try {
            handleOpen();
          } catch (err) {
            console.error(err);
            alert('Error Opening Note');
          }
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
            alert('Error Deleting Note');
          }
        }}
      ></button>
    </div>
  );
};

export default NoteItem;
