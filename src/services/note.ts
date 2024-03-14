import { Note } from '../types';

let notes: Note[] = [];

const fetchNotes = async () => {
  const items = await chrome.storage.sync.get('notes');
  notes = items.notes || [];
};

try {
  await fetchNotes(); // Fetch notes initially when module is loaded
} catch (err) {
  console.error(err);
}

const generateId = (): number => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

const getAll = async (): Promise<Note[]> => {
  return notes;
};

const getById = async (id: number): Promise<Note | null> => {
  const foundNote = notes.find((a) => a.id === id);
  return foundNote ? foundNote : null;
};

const create = async (newNote: {
  title: string;
  content: string;
}): Promise<Note> => {
  const createdNote = {
    id: generateId(),
    title: newNote.title,
    content: newNote.content,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  } as Note;

  notes = [...notes, createdNote];

  await chrome.storage.sync.set({
    notes: notes,
  });

  return createdNote;
};

const update = async (
  id: number,
  newNote: { title: string; content: string }
): Promise<Note | null> => {
  const foundNoteIndex = notes.findIndex((a) => a.id === id);

  if (foundNoteIndex === -1) {
    return null;
  }

  const updatedNote = {
    ...notes[foundNoteIndex],
    title: newNote.title,
    content: newNote.content,
    updatedAt: new Date().toISOString(),
  } as Note;

  notes[foundNoteIndex] = updatedNote;

  await chrome.storage.sync.set({
    notes: notes,
  });

  return updatedNote;
};

const remove = async (id: number) => {
  notes = notes.filter((note) => note.id !== id);
  await chrome.storage.sync.set({
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
