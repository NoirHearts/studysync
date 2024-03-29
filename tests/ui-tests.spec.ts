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

  test.describe('dictionary content', () => {
    test('is hidden by default', async ({ page }) => {
      await expect(page.locator('#dictionary-content')).toBeHidden();
    });

    test('becomes visible when button clicked', async ({ page }) => {
      await page.locator('label[for=dictionary-button]').click();
      await expect(page.locator('#dictionary-content')).toBeVisible();
    });

    test('becomes hidden when button clicked while content is visible', async ({
      page,
    }) => {
      await page.locator('label[for=dictionary-button]').click();
      await page.locator('label[for=dictionary-button]').click();
      await expect(page.locator('#dictionary-content')).toBeHidden();
    });
  });

  test.describe('notes content', () => {
    test('is hidden by default', async ({ page }) => {
      await expect(page.locator('#notes-content')).toBeHidden();
    });

    test('becomes visible when button clicked', async ({ page }) => {
      await page.locator('label[for=notes-button]').click();
      await expect(page.locator('#notes-content')).toBeVisible();
    });

    test('becomes hidden when button clicked while content is visible', async ({
      page,
    }) => {
      await page.locator('label[for=notes-button]').click();
      await page.locator('label[for=notes-button]').click();
      await expect(page.locator('#notes-content')).toBeHidden();
    });
  });

  test.describe('to-do list content', () => {
    test('is hidden by default', async ({ page }) => {
      await expect(page.locator('#tasks-content')).toBeHidden();
    });

    test('becomes visible when button clicked', async ({ page }) => {
      await page.locator('label[for=tasks-button]').click();
      await expect(page.locator('#tasks-content')).toBeVisible();
    });

    test('becomes hidden when button clicked while content is visible', async ({
      page,
    }) => {
      await page.locator('label[for=tasks-button]').click();
      await page.locator('label[for=tasks-button]').click();
      await expect(page.locator('#tasks-content')).toBeHidden();
    });
  });
});
