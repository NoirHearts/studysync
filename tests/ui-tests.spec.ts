import { test, expect } from './fixtures';

test.describe('testing initial UI', () => {
  test.beforeEach(async ({ page, extensionId }) => {
    await page.goto(`chrome-extension://${extensionId}/panel.html`);
  });

  test('renders correctly', async ({ page }) => {
    await expect(page.locator('body').getByRole('heading')).toHaveText(
      'StudySync'
    );
  });

  test('dictionary content hidden by default', async ({ page }) => {
    await expect(page.locator('.dictionary-content')).toBeHidden();
  });

  test('dictionary content becomes visible when clicked', async ({ page }) => {
    await page.getByText('Dictionary', { exact: true }).click();
    await expect(page.locator('.dictionary-content')).toBeVisible();
  });

  test('hide dictionary when dictionary content is visible', async ({ page }) => {
    await page.getByText('Dictionary', { exact: true }).click();
    await page.getByText('Dictionary', { exact: true }).click();
    await expect(page.locator('.dictionary-content')).toBeHidden();
  });

  test('notes content hidden by default', async ({ page }) => {
    await expect(page.locator('.notes-content')).toBeHidden();
  });

  test('notes content becomes visible when clicked', async ({ page }) => {
    await page.getByText('Notes', { exact: true }).click();
    await expect(page.locator('.notes-content')).toBeVisible();
  });

  test('hide notes when notes content is visible', async ({ page }) => {
    await page.getByText('Notes', { exact: true }).click();
    await page.getByText('Notes', { exact: true }).click();
    await expect(page.locator('.notes-content')).toBeHidden();
  });

  test('to-do list content hidden by default', async ({ page }) => {
    await expect(page.locator('.tasks-content')).toBeHidden();
  });

  test('to-do list content becomes visible when clicked', async ({ page }) => {
    await page.getByText('To-Do List').click();
    await expect(page.locator('.tasks-content')).toBeVisible();
  });

  test('hide to-do list when to-do list is visible', async ({ page }) => {
    await page.getByText('To-Do List').click();
    await page.getByText('To-Do List').click();
    await expect(page.locator('.tasks-content')).toBeHidden();
  });
});
