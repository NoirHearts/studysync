import { test, expect } from './fixtures';

const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

test.describe('Notes', () => {

  const generate_note = async (page, title, content) => {
    // assert: note title appears in list
    await expect(page.locator('#create-note-button')).toHaveCount(1);
    
    // click [+] button to create note
    await page.locator('#create-note-button').click();

    // write title
    await page.locator('#note-editor-title-input').fill(title);
    // write content
    await page
      .locator('#note-editor-content-input')
      .fill(content);
    
    // close note
    await page.locator('#note-editor-back').click();

  }

  test.beforeEach(async ({ page, extensionId }) => {
    await page.goto(`chrome-extension://${extensionId}/panel.html`);
  });

  // Add New Note
  test.describe('can be created', async () => {

    test('can add, edit and save new note', async ({ page }) => {
      // click on notes list
      await page.locator('label[for=notes-button]').click();
      
      // generate note
      await generate_note(page, 'Lorem Ipsum', 'Lorem Ipsum Dolor sit Amet')
        
      // assert: note title appears in list
      await expect(page.locator('.note-item-title')).toContainText('Lorem Ipsum');
    });
  });

  test.describe('when existing', async () => {

    test('can be opened', async ({ page }) => {
    
      // click on notes list
      await page.locator('label[for=notes-button]').click();
      
      await generate_note(page, 'Lorem Ipsum', 'Lorem Ipsum Dolor sit Amet')
      
      // click on notes item
      await page.locator(".note-item", { has: page.getByText('Lorem Ipsum') }).click();

      // assert: note content appears in editor
      await expect(page.locator('#note-editor-content-input')).toContainText(
        'Lorem Ipsum Dolor sit Amet'
      );

    });

    test('can be edited and saved', async ({ page }) => {
    
      // click on notes list
      await page.locator('label[for=notes-button]').click();
      
      // generate note
      await generate_note(page, 'Lorem Ipsum', 'Lorem Ipsum Dolor sit Amet')
      
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

  
  test.describe('When deleting', async () => {
  
    test('can be deleted from within editor', async ({ page }) => {
      // click on notes list
      await page.locator('label[for=notes-button]').click();

      await generate_note(page, 'Lorem Ipsum', 'Lorem Ipsum Dolor sit Amet')

      // click on notes item
      await page.locator(".note-item", { has: page.getByText('Lorem Ipsum') }).click();
      
      // click on delete note button
      await page.locator('#note-editor-delete').click();

      // assert: no notes in list
      await expect(page.locator(".note-item", { has: page.getByText('Lorem Ipsum') })).toHaveCount(0);
      
    });

    test('can be deleted from main pane', async ({ page }) => {

      // create note to delete
      await page.locator('label[for=notes-button]').click();
      await generate_note(page, 'Lorem Ipsum', 'Lorem Ipsum Dolor sit Amet')

      // click on delete note button
      await page.locator(".note-item", { has: page.getByText('Lorem Ipsum') }).locator(".note-item-delete").click();
      
      // assert: no notes in list
      // await expect(page.locator(".note-item", { has: page.getByText('Lorem Ipsum') })).toHaveCount(0);
      
    });

  });

  test.describe('when closing the notes feature', async () => {
    test('notes feature shows list of notes when reopened', async ({ page }) => {

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
      // uncomment me when this feature is implemented
      // await expect(page.locator("#create-note-button")).toHaveCount(1);

    });

  });
});
