import { Note } from '../types';

let notes: Note[] = [];

/**
 * Fetches notes from Chrome storage and updates the notes array.
 */
const fetchNotes = async (): Promise<void> => {
  const items = await chrome.storage.sync.get('notes');
  notes = items.notes || [];
};

try {
  await fetchNotes(); // Fetch notes initially when module is loaded
} catch (err) {
  console.error(err);
}

/**
 * Generates a unique ID for a new note based on the maximum ID in the current notes array.
 * @returns The generated ID.
 */
const generateId = (): number => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

/**
 * Retrieves all notes.
 * @returns A promise that resolves with an array of all notes.
 */
const getAll = async (): Promise<Note[]> => {
  return notes;
};

/**
 * Retrieves a note by its ID.
 * @param id - The ID of the note to retrieve.
 * @returns A promise that resolves with the note corresponding to the provided ID, or null if not found.
 */
const getById = async (id: number): Promise<Note | null> => {
  const foundNote = notes.find((a) => a.id === id);
  return foundNote ? foundNote : null;
};

/**
 * Creates a new note.
 * @param newNote - The new note object containing title and content.
 * @returns A promise that resolves with the created note.
 */
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

/**
 * Updates an existing note.
 * @param id - The ID of the note to update.
 * @param newNote - The updated note object containing new title and content.
 * @returns A promise that resolves with the updated note, or null if the note with the provided ID was not found.
 */
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

/**
 * Removes a note.
 * @param id - The ID of the note to remove.
 */
const remove = async (id: number): Promise<void> => {
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
