import React from 'react';
import { Note } from '../types';
import NoteItem from './NoteItem';


export const NoteItemTest: React.FC = () => {
  const testNote: Note = {
    id: 12345,
    title: 'Lorem Ipsum',
    content: 'Lorem ipsum dolor sit amet',
    createdAt: '12345',
    updatedAt: '12345'
  }

  return <NoteItem note={testNote} handleOpen={() => {throw new Error();}} handleDelete={() => {throw new Error();}}/>;
};