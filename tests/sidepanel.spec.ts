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

  test('click buttons', async ({ page }) => {
    await page.getByText('Dictionary', { exact: true }).click();
    await page.getByText('Dictionary', { exact: true }).click();
    await page.getByText('Notes', { exact: true }).click();
    await page.getByText('To-Do List').click();
    await page.locator('#start-btn').click();
    await page.locator('#pause-btn').click();
    await page.locator('#stop-btn').click();
  })
});
