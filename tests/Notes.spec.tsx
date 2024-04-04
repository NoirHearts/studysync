import { test, expect, MountResult } from '@playwright/experimental-ct-react';
import Notes from '../src/components/Notes';
import React from 'react';

test.use({ viewport: { width: 400, height: 876 } });
// const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

test.describe('Notes', () => {
  let component: MountResult;

  test.beforeEach(async ({ mount }) => {
    component = await mount(<Notes />);
  });
  
  // Add New Note
  test.describe('Add New Note', async () => {
    // click on new note button
    test('Clicking on new note button opens editor interface...', async () => {
      await component.locator('#create-note-button').click()
    });

    test('Adding title...', async () => {
      await component.locator('#note-editor-title-input').fill('Lorem Ipsum')
    });

    test('Adding text...', async () => {
      await component.locator('#note-editor-content-input').fill('Lorem Ipsum Dolor sit Amet')
    });

    test('Exiting interface...', async () => {
      await component.locator('#note-editor-back').click()
    });
    
  });
});
