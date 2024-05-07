import React from 'react';
import { Note } from '../types';
import noteService from '../services/note';

interface Props {
  note: Note;
  searchString: string;
  handleOpen: () => void;
  handleDelete: (note: Note) => void;
}

const NoteItem: React.FC<Props> = ({
  note,
  searchString,
  handleOpen,
  handleDelete,
}) => {
  const highlightMatch = (text: string) => {
    if (searchString === '') return text;
    const regex = new RegExp(`(${searchString})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
  };

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
        <h3
          className="note-item-title"
          dangerouslySetInnerHTML={{ __html: highlightMatch(note.title) }}
        />
        <div className="note-item-content">
          {note.content.split('\n').map((paragraph, index) => (
            <React.Fragment key={index}>
              {
                <span
                  dangerouslySetInnerHTML={{
                    __html: highlightMatch(paragraph),
                  }}
                />
              }
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
