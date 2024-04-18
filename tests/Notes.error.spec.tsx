

import { test, expect, MountResult } from '@playwright/experimental-ct-react';
import React from 'react';
import { NoteItemTest } from '../src/components/NoteItemTest'
// import NoteEditor from '../src/components/NoteEditor'

test.use({ viewport: { width: 400, height: 876 } });

test.describe('Notes', () => {
  
  test.describe('when errors are encountered', async () => {

    let component: MountResult;
  
    test('feature handles errors when opening notes', async ({ mount }) => {
      component = await mount(<NoteItemTest />)
      await component.click();
    });
  
    test('feature handles errors when deleting notes', async ({ page, mount }) => {
      component = await mount(<NoteItemTest />)
      page.on('dialog', async dialog => { // not working?
        await expect(dialog.message() == 'Error Deleting Note').toBeTruthy()
        await dialog.dismiss()
      })
      await component.locator(".note-item-delete").click();
    });
  
  });
});
