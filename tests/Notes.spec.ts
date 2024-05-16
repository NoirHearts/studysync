import { Page } from '@playwright/test';
import { test, expect } from './fixtures';

const generate_note = async (page: Page, title: string, content: string) => {
  await expect(page.locator('#create-note-button')).toHaveCount(1);

  await page.locator('#create-note-button').click();
  await page.locator('#note-editor-title-input').fill(title);
  await page.locator('#note-editor-content-input').fill(content);

  await page.locator('#note-editor-back').click();
};

test.describe('Notes', () => {
  test.beforeEach(async ({ page, extensionId }) => {
    await page.goto(`chrome-extension://${extensionId}/panel.html`);
    await page.locator('label[for=notes-button]').click();
  });

  test('new notes can be added', async ({ page }) => {
    await generate_note(page, 'Lorem Ipsum', 'Lorem Ipsum Dolor sit Amet');
    await expect(page.locator('.note-item-title')).toContainText('Lorem Ipsum');
    await expect(page.locator('.note-item-content')).toContainText(
      'Lorem Ipsum Dolor sit Amet'
    );
  });

  test('new notes can be edited', async ({ page }) => {
    await generate_note(page, 'Lorem Ipsum', 'Lorem Ipsum Dolor sit Amet');

    await page
      .locator('.note-item', { has: page.getByText('Lorem Ipsum') })
      .click();
    await page.locator('#note-editor-title-input').fill('RE: Lorem Ipsum');
    await page
      .locator('#note-editor-content-input')
      .fill('RE: Lorem Ipsum Dolor sit Amet');
    await page.locator('#note-editor-back').click();

    await expect(page.locator('.note-item-title')).toContainText(
      'RE: Lorem Ipsum'
    );
    await expect(page.locator('.note-item-content')).toContainText(
      'RE: Lorem Ipsum Dolor sit Amet'
    );
  });

  test('notes are sorted by editing time', async ({ page }) => {
    await generate_note(page, 'Lorem Ipsum', 'Lorem Ipsum Dolor sit Amet');
    await generate_note(page, 'Integer et', 'Integer et pellentesque dui');

    await expect(
      page.locator('.note-item').first().locator('.note-item-title')
    ).toContainText('Integer et');
    await expect(
      page.locator('.note-item').first().locator('.note-item-content')
    ).toContainText('Integer et pellentesque dui');

    await page
      .locator('.note-item', { has: page.getByText('Lorem Ipsum') })
      .click();
    await page.locator('#note-editor-title-input').fill('RE: Lorem Ipsum');
    await page
      .locator('#note-editor-content-input')
      .fill('RE: Lorem Ipsum Dolor sit Amet');
    await page.locator('#note-editor-back').click();

    await expect(
      page.locator('.note-item').first().locator('.note-item-title')
    ).toContainText('RE: Lorem Ipsum');
    await expect(
      page.locator('.note-item').first().locator('.note-item-content')
    ).toContainText('RE: Lorem Ipsum Dolor sit Amet');
  });

  test('notes can be filtered by search string', async ({ page }) => {
    await generate_note(page, 'Lorem Ipsum', 'Lorem Ipsum Dolor sit Amet');
    await generate_note(page, 'Integer et', 'Integer et pellentesque dui');

    await expect(page.locator('.note-item')).toHaveCount(2);

    await page.locator('.search-note-input').fill('Ipsum');

    await expect(page.locator('.note-item')).toHaveCount(1);

    await expect(
      page.locator('.note-item').locator('.note-item-title')
    ).toContainText('Lorem Ipsum');

    await page.locator('.search-note-input').fill('Integer');

    await expect(page.locator('.note-item')).toHaveCount(1);

    await expect(
      page.locator('.note-item').locator('.note-item-title')
    ).toContainText('Integer et');

    await page.locator('.search-note-input').fill('Nonexisting string');
    await expect(page.locator('.note-item')).toHaveCount(0);
  });

  test.describe('when existing', async () => {
    test.beforeEach(async ({ page }) => {
      await generate_note(page, 'Lorem Ipsum', 'Lorem Ipsum Dolor sit Amet');
    });

    test('can be opened', async ({ page }) => {
      await page
        .locator('.note-item', { has: page.getByText('Lorem Ipsum') })
        .click();

      await expect(page.locator('#note-editor-content-input')).toHaveValue(
        'Lorem Ipsum Dolor sit Amet'
      );
    });

    test('can be edited', async ({ page }) => {
      await page
        .locator('.note-item', { has: page.getByText('Lorem Ipsum') })
        .click();
      await expect(page.locator('#note-editor-title-input')).toHaveValue(
        'Lorem Ipsum'
      );
      await expect(page.locator('#note-editor-content-input')).toHaveValue(
        'Lorem Ipsum Dolor sit Amet'
      );

      await page.locator('#note-editor-title-input').fill('RE: Lorem Ipsum');
      await page
        .locator('#note-editor-content-input')
        .fill('RE: Lorem Ipsum Dolor sit Amet');
      await page.locator('#note-editor-back').click();

      await expect(page.locator('.note-item-title')).toContainText(
        'RE: Lorem Ipsum'
      );
      await expect(page.locator('.note-item-content')).toContainText(
        'RE: Lorem Ipsum Dolor sit Amet'
      );
    });

    test('can be deleted from within editor', async ({ page }) => {
      await page
        .locator('.note-item', { has: page.getByText('Lorem Ipsum') })
        .click();

      await page.locator('#note-editor-delete').click();

      await expect(
        page.locator('.note-item', { has: page.getByText('Lorem Ipsum') })
      ).toHaveCount(0);
    });

    test('can be deleted from main pane', async ({ page }) => {
      page.on('dialog', async (dialog) => {
        if (dialog.type() === 'confirm') {
          await dialog.accept();
        }
      });

      await page
        .locator('.note-item', { has: page.getByText('Lorem Ipsum') })
        .locator('.note-item-delete')
        .click();

      await expect(
        page.locator('.note-item', { has: page.getByText('Lorem Ipsum') })
      ).toHaveCount(0);
    });
  });

  test.describe('when closing the notes feature', async () => {
    test('notes feature shows list of notes when reopened', async ({
      page,
    }) => {
      // open note editor
      await page.locator('#create-note-button').click();
      await page.locator('#note-editor-title-input').fill('Lorem Ipsum');

      // close note pane
      await page.locator('label[for=notes-button]').click();

      // reopen note pane
      await page.locator('label[for=notes-button]').click();

      // check if add note button is there
      // uncomment me when this feature is implemented
      // await expect(page.locator('#create-note-button')).toHaveCount(1);
    });
  });
});
