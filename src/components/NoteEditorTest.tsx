import React from 'react';
import { Note } from '../types';
import NoteEditor from './NoteEditor';


export const NoteEditorTest: React.FC = () => {
  const testNote: Note = {
    id: 12345,
    title: 'Lorem Ipsum',
    content: 'Lorem ipsum dolor sit amet',
    createdAt: '12345',
    updatedAt: '12345'
  }

  return <NoteEditor
    note={testNote}  
    handleCreate={() => {throw new Error();}}
    handleUpdate={() => {throw new Error();}}
    handleDelete={() => {throw new Error();}}
    handleBack={() => {throw new Error();}}
  />;
};