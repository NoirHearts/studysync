import { test, expect, MountResult } from '@playwright/experimental-ct-react';
import React from 'react';
import { NoteItemTest } from '../src/components/NoteItemTest';
import { NoteEditorTest } from '../src/components/NoteEditorTest';

test.use({ viewport: { width: 400, height: 876 } });
const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

test.describe('Notes', () => {
  test.describe('when errors are encountered', async () => {
    let component: MountResult;

    test('feature handles errors when opening notes', async ({
      page,
      mount,
    }) => {
      component = await mount(<NoteItemTest />);
      page.on('dialog', async (dialog) => {
        await expect(dialog.message() == 'Error Opening Note').toBeTruthy();
        await dialog.dismiss();
      });
      await component.click();
    });

    test('feature handles errors when saving notes', async ({
      page,
      mount,
    }) => {
      component = await mount(<NoteEditorTest />);
      page.on('dialog', async (dialog) => {
        await expect(dialog.message() == 'Error Saving Note').toBeTruthy();
        await dialog.dismiss();
      });

      // write title
      await component.locator('#note-editor-title-input').fill('Lorem Ipsum');
      // write content
      await component
        .locator('#note-editor-content-input')
        .fill('Lorem ipsum dolor sit amet');

      // wait for autosave
      await wait(1000);

      // close note (must induce error)
      await page.locator('#note-editor-back').click();
    });

    test('feature handles errors when deleting notes', async ({
      page,
      mount,
    }) => {
      component = await mount(<NoteItemTest />);
      page.on('dialog', async (dialog) => {
        await expect(dialog.message() == 'Error Deleting Note').toBeTruthy();
        await dialog.dismiss();
      });
      await component.locator('.note-item-delete').click();
    });
  });
});
