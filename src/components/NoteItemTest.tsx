import React from 'react';
import { Note } from '../types';
import NoteItem from './NoteItem';

interface Props {
  noteId?: number;
  noteTitle?: string;
  noteContent?: string;
  noteCreated?: string;
  noteUpdated?: string;
  handleOpen?: () => void;
  handleDelete?: (note: Note) => void;
}

export const NoteItemTest: React.FC<Props> = ({
  noteId,
  noteTitle,
  noteContent,
  noteCreated,
  noteUpdated,
  handleOpen = () => {},
  handleDelete = () => {},
}) => {
  const testNote: Note = {
    id: noteId || 0,
    title: noteTitle || 'Lorem ipsum',
    content: noteContent || '',
    createdAt: noteCreated || '2024-04-18T12:00:00.000Z',
    updatedAt: noteUpdated || '2024-04-18T12:00:00.000Z',
  };

  return (
    <NoteItem
      note={testNote}
      handleOpen={handleOpen}
      handleDelete={handleDelete}
    />
  );
};
