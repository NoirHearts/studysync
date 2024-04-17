import { test, expect } from './fixtures';

const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

test.describe('Notes', () => {
  test.beforeEach(async ({ page, extensionId }) => {
    await page.goto(`chrome-extension://${extensionId}/panel.html`);
  });

  // Add New Note
  test.describe('Note Editing', async () => {

    test('Add, Edit, and Save New Note', async ({ page }) => {
      // click on notes list
      await page.locator('label[for=notes-button]').click();
      
      // click [+] button to create note
      await page.locator('#create-note-button').click();

      // write title
      await page.locator('#note-editor-title-input').fill('Lorem Ipsum');
      // write content
      await page
        .locator('#note-editor-content-input')
        .fill('Lorem Ipsum Dolor sit Amet');
      
        // wait for autosave
      await wait(1000);
      
      // close note
      await page.locator('#note-editor-back').click();
      
      // assert: note title appears in list
      await expect(page.locator('.note-item-title')).toContainText(
        'Lorem Ipsum'
      );
    });

    test('Open Existing Note', async ({ page }) => {
    
      // click on notes list
      await page.locator('label[for=notes-button]').click();
      
      // click [+] button to create note
      await page.locator('#create-note-button').click();

      // write title
      await page.locator('#note-editor-title-input').fill('Lorem Ipsum');
      // write content
      await page
        .locator('#note-editor-content-input')
        .fill('Lorem Ipsum Dolor sit Amet');
      
      // wait for autosave
      await wait(1000);
      
      // close note
      await page.locator('#note-editor-back').click();
      
      // assert: note title appears in list
      await expect(page.locator('.note-item-title')).toContainText(
        'Lorem Ipsum'
      );
      
      // click on notes item
      await page.locator(".note-item", { has: page.getByText('Lorem Ipsum') }).click();

      // assert: note content appears in editor
      await expect(page.locator('#note-editor-content-input')).toContainText(
        'Lorem Ipsum Dolor sit Amet'
      );

    });

    test('Edit and Save Existing Note', async ({ page }) => {
    
      // click on notes list
      await page.locator('label[for=notes-button]').click();
      
      // click [+] button to create note
      await page.locator('#create-note-button').click();

      // write title
      await page.locator('#note-editor-title-input').fill('Lorem Ipsum');
      // write content
      await page
        .locator('#note-editor-content-input')
        .fill('Lorem Ipsum Dolor sit Amet');
      
        // wait for autosave
      await wait(1000);
      
      // close note
      await page.locator('#note-editor-back').click();
      
      // assert: note title appears in list
      await expect(page.locator('.note-item-title')).toContainText(
        'Lorem Ipsum'
      );
      
      // click on notes item
      await page.locator(".note-item", { has: page.getByText('Lorem Ipsum') }).click();

      // assert: note content appears in editor
      await expect(page.locator('#note-editor-content-input')).toContainText(
        'Lorem Ipsum Dolor sit Amet'
      );

      // rewrite content
      await page
        .locator('#note-editor-content-input')
        .fill('RE: Lorem Ipsum Dolor sit Amet');

      // wait for autosave
      await wait(1000);
      
      // close note
      await page.locator('#note-editor-back').click();

      // assert: note title appears in list
      await expect(page.locator('.note-item-title')).toContainText(
        'Lorem Ipsum'
      );
      
      // click on notes item
      await page.locator(".note-item", { has: page.getByText('Lorem Ipsum') }).click();

      // assert: note content appears in editor
      await expect(page.locator('#note-editor-content-input')).toContainText(
        'RE: Lorem Ipsum Dolor sit Amet'
      );

      // rewrite title
      await page.locator('#note-editor-title-input').fill('RE: Lorem Ipsum');

      // wait for autosave
      await wait(1000);

      // close note
      await page.locator('#note-editor-back').click();

      // assert: note title appears in list
      await expect(page.locator('.note-item-title')).toContainText(
        'RE: Lorem Ipsum'
      );

      // click on notes item
      await page.locator(".note-item", { has: page.getByText('RE: Lorem Ipsum') }).click();

      // assert: note content appears in editor
      await expect(page.locator('#note-editor-content-input')).toContainText(
        'RE: Lorem Ipsum Dolor sit Amet'
      );

    });

  });

  
  test.describe('Note Deleting', async () => {
  
    test('Delete existing note from NotesOpenUI', async ({ page }) => {
      // click on notes list
      await page.locator('label[for=notes-button]').click();

      // click [+] button to create note
      await page.locator('#create-note-button').click();

      // write title
      await page.locator('#note-editor-title-input').fill('Lorem Ipsum');
      // write content
      await page
        .locator('#note-editor-content-input')
        .fill('Lorem Ipsum Dolor sit Amet');
      
        // wait for autosave
      await wait(1000);
      
      // close note
      await page.locator('#note-editor-back').click();
      
      // assert: note title appears in list
      await expect(page.locator('.note-item-title')).toContainText(
        'Lorem Ipsum'
      );

      // click on notes item
      await page.locator(".note-item", { has: page.getByText('Lorem Ipsum') }).click();
      
      // click on delete note button
      await page.locator('#note-editor-delete').click();

      // assert: no notes in list
      await expect(page.locator(".note-item", { has: page.getByText('Lorem Ipsum') })).toHaveCount(0);
      
    });

    test('Delete existing note from NoteList', async ({ page }) => {

      // create note to delete
      await page.locator('label[for=notes-button]').click();
      await page.locator('#create-note-button').click();
      await page.locator('#note-editor-title-input').fill('Lorem Ipsum');
      await page
        .locator('#note-editor-content-input')
        .fill('Lorem Ipsum Dolor sit Amet');
      await wait(1000);
      await page.locator('#note-editor-back').click();
      await expect(page.locator('.note-item-title')).toContainText(
        'Lorem Ipsum'
      );

      // click on delete note button
      await page.locator(".note-item", { has: page.getByText('Lorem Ipsum') }).locator(".note-item-delete").click();
      
      // assert: no notes in list
      await expect(page.locator(".note-item", { has: page.getByText('Lorem Ipsum') })).toHaveCount(0);
      
    });

  });

  test.describe('UI Interaction', async () => {
    test('Click Notes Button while in OpenNotesUI', async ({ page }) => {

      // open note editor
      await page.locator('label[for=notes-button]').click();
      await page.locator('#create-note-button').click();
      await page.locator('#note-editor-title-input').fill('Lorem Ipsum');
      
      // close note pane
      await page.locator('label[for=notes-button]').click();
      // wait
      await wait(1500);
      // reopen note pane
      await page.locator('label[for=notes-button]').click();
      // wait
      await wait(1500);
      
      // check if add note button is there
      await expect(page.locator("#create-note-button")).toHaveCount(1);

    });

  });
});
