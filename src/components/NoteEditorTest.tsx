import React from 'react';
import { Note } from '../types';
import NoteEditor from './NoteEditor';

interface Props {
  noteId?: number;
  noteTitle?: string;
  noteContent?: string;
  noteCreated?: string;
  noteUpdated?: string;
  handleCreate?: (note: Note) => void;
  handleUpdate?: (note: Note) => void;
  handleDelete?: (note: Note) => void;
  handleBack?: () => void;
}

export const NoteEditorTest: React.FC<Props> = ({
  noteId,
  noteTitle,
  noteContent,
  noteCreated,
  noteUpdated,
  handleCreate = () => {},
  handleUpdate = () => {},
  handleDelete = () => {},
  handleBack = () => {},
}) => {
  const testNote: Note = {
    id: noteId || 0,
    title: noteTitle || 'Lorem ipsum',
    content: noteContent || '',
    createdAt: noteCreated || '2024-04-18T12:00:00.000Z',
    updatedAt: noteUpdated || '2024-04-18T12:00:00.000Z',
  };

  return (
    <NoteEditor
      note={testNote}
      handleCreate={handleCreate}
      handleUpdate={handleUpdate}
      handleDelete={handleDelete}
      handleBack={handleBack}
    />
  );
};
