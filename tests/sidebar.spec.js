import { test, expect } from './fixtures';

test.describe('sidebar', () => {
  test.beforeEach(async ({ page, extensionId }) => {
    await page.goto(`chrome-extension://${extensionId}/sidepanel.html`)
  });

  test('renders correctly', async ({ page }) => {
    await expect(page.locator('body').getByRole("heading")).toHaveText('StudySync');
  });
})
