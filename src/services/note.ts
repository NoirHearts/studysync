import { Note } from '../types';

let notes: Note[] = [];

const fetchNotes = () => {
  chrome.storage.sync.get('notes', (items) => {
    notes = items.notes || [];
  });
};

fetchNotes(); // Fetch notes initially when module is loaded

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

const getAll = (callback: (notes: Note[]) => void) => {
  callback(notes);
};

const getById = (id: number, callback: (note: Note | null) => void) => {
  const foundNote = notes.find((a) => a.id === id);
  callback(foundNote ? foundNote : null);
};

const create = (
  newNote: { title: string; content: string },
  callback: (note: Note) => void
) => {
  const createdNote = {
    id: generateId(),
    title: newNote.title,
    content: newNote.content,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  notes = [...notes, createdNote];

  chrome.storage.sync.set({
    notes: notes,
  });

  callback(createdNote);
};

const update = (
  id: number,
  newNote: { title: string; content: string },
  callback: (note: Note | null) => void
) => {
  const foundNoteIndex = notes.findIndex((a) => a.id === id);

  if (foundNoteIndex === -1) {
    callback(null);
    return;
  }

  const updatedNote = {
    ...notes[foundNoteIndex],
    title: newNote.title,
    content: newNote.content,
    updatedAt: new Date().toISOString(),
  };

  notes[foundNoteIndex] = updatedNote;

  chrome.storage.sync.set({
    notes: notes,
  });

  callback(updatedNote);
};

const remove = (id: number) => {
  notes = notes.filter((note) => note.id !== id);
  chrome.storage.sync.set({
    notes: notes,
  });
};

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
