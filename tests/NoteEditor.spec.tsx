import { test, expect, MountResult } from '@playwright/experimental-ct-react';
import React from 'react';
import { NoteEditorTest } from '../src/components/NoteEditorTest';

test.use({ viewport: { width: 400, height: 876 } });

test.describe('NoteEditor', () => {
  let component: MountResult;

  test.describe('when errors are encountered', async () => {
    test.beforeEach(async ({ mount }) => {
      component = await mount(
        <NoteEditorTest
          handleBack={() => {
            throw new Error();
          }}
          handleCreate={() => {
            throw new Error();
          }}
          handleDelete={() => {
            throw new Error();
          }}
          handleUpdate={() => {
            throw new Error();
          }}
        />
      );
    });

    test('shows proper error message on saving', async ({ page }) => {
      page.on('dialog', async (dialog) => {
        expect(dialog.message()).toContain('Error Saving Note');
        await dialog.dismiss();
      });

      // write title
      await component.locator('#note-editor-title-input').fill('Lorem Ipsum');
      // write content
      await component
        .locator('#note-editor-content-input')
        .fill('Lorem ipsum dolor sit amet');

      // close note (must induce error)
      await page.locator('#note-editor-back').click();
    });
  });
});
