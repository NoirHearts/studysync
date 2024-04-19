import { test, expect, MountResult } from '@playwright/experimental-ct-react';
import React from 'react';
import { NoteItemTest } from '../src/components/NoteItemTest';

test.use({ viewport: { width: 400, height: 876 } });

test.describe('NoteItem', () => {
  let component: MountResult;

  test.describe('when errors are encountered', async () => {
    test.beforeEach(async ({ mount }) => {
      component = await mount(
        <NoteItemTest
          handleOpen={() => {
            throw new Error();
          }}
          handleDelete={() => {
            throw new Error();
          }}
        />
      );
    });

    test('shows proper error message on opening', async ({ page }) => {
      page.on('dialog', async (dialog) => {
        expect(dialog.message()).toContain('Error Opening Note');
        await dialog.dismiss();
      });
      await component.click();
    });

    test('shows proper error message on deleting', async ({ page }) => {
      page.on('dialog', async (dialog) => {
        expect(dialog.message()).toContain('Error Deleting Note');
        await dialog.dismiss();
      });
      await component.locator('.note-item-delete').click();
    });
  });
});
