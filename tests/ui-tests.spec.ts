import { test, expect } from './fixtures';

test.describe('sidepanel', () => {
  test.beforeEach(async ({ page, extensionId }) => {
    await page.goto(`chrome-extension://${extensionId}/panel.html`);
  });

  test('renders correctly', async ({ page }) => {
    await expect(page.locator('body').getByRole('heading')).toHaveText(
      'StudySync'
    );
  });


  test('dictionary content hidden', async ({ page }) => {
    await expect(page.locator('.dictionary-content')).toBeHidden();
  });

  test('dictionary becomes visible when clicked', async ({ page }) => {
    await page.getByText('Dictionary', { exact: true }).click();
    await expect(page.locator('.dictionary-content')).toBeVisible();
  });

  test('hide dictionary', async ({ page }) => {
    await page.getByText('Dictionary', { exact: true }).click();
    await page.getByText('Dictionary', { exact: true }).click();
    await expect(page.locator('.dictionary-content')).toBeHidden();
  });

  test('notes content hidden', async ({ page }) => {
    await expect(page.locator('.notes-content')).toBeHidden();
  });

  test('notes becomes visible when clicked', async ({ page }) => {
    await page.getByText('Notes', { exact: true }).click();
    await expect(page.locator('.notes-content')).toBeVisible();
  });

  test('hide notes', async ({ page }) => {
    await page.getByText('Notes', { exact: true }).click();
    await page.getByText('Notes', { exact: true }).click();
    await expect(page.locator('.notes-content')).toBeHidden();
  });

  test('to do list content hidden', async ({ page }) => {
    await expect(page.locator('.tasks-content')).toBeHidden();
  });

  test('to do list becomes visible when clicked', async ({ page }) => {
    await page.getByText('To-Do List').click();
    await expect(page.locator('.tasks-content')).toBeVisible();
  });

  test('hide to do list', async ({ page }) => {
    await page.getByText('To-Do List').click();
    await page.getByText('To-Do List').click();
    await expect(page.locator('.tasks-content')).toBeHidden();
  });
});
