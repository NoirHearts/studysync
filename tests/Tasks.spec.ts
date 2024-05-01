import { Page } from '@playwright/test';
import { test, expect } from './fixtures';

const generate_task = async (page: Page, content: string) => {
  await page.locator('#create-task-button').click();
  await page.locator('.task-item-text').last().fill(content);

  await page.locator('.panel-container').click();
};

test.describe('Tasks', () => {
  test.beforeEach(async ({ page, extensionId }) => {
    await page.goto(`chrome-extension://${extensionId}/panel.html`);
    await page.locator('label[for=tasks-button]').click();
  });

  test('new tasks can be added', async ({ page }) => {
    await generate_task(page, 'Lorem Ipsum Dolor sit Amet');
    await expect(page.locator('.task-item')).toHaveCount(1);
    await expect(page.locator('.task-item-text')).toContainText(
      'Lorem Ipsum Dolor sit Amet'
    );
  });

  test.describe('when existing', async () => {
    test.beforeEach(async ({ page }) => {
      await generate_task(page, 'Lorem Ipsum Dolor sit Amet');
    });

    test('can be edited', async ({ page }) => {
      await page
        .locator('.task-item-text')
        .last()
        .fill('The new task description');

      await expect(page.locator('.task-item-text')).toContainText(
        'The new task description'
      );
    });

    test('can be deleted', async ({ page }) => {
      await page.locator('.task-item-delete').click();

      await expect(page.locator('.task-item')).toHaveCount(0);
    });

    test('can be ticked', async ({ page }) => {
      await page.locator('.task-item-checkbox').click();

      await expect(page.locator('.task-item-text')).toHaveCSS(
        'text-decoration',
        /line-through/
      );
    });

    test('can be unticked', async ({ page }) => {
      await page.locator('.task-item-checkbox').click();

      await expect(page.locator('.task-item-text')).toHaveCSS(
        'text-decoration',
        /line-through/
      );

      await page.locator('.task-item-checkbox').click();

      await expect(page.locator('.task-item-text')).toHaveCSS(
        'text-decoration',
        /none/
      );
    });

    test('is automatically saved if not empty', async ({ page }) => {
      await page
        .locator('.task-item-text')
        .last()
        .fill('The new task description');
      await page.locator('.panel-container').click();

      await page.reload();

      await expect(page.locator('.task-item')).toHaveCount(1);
      await expect(page.locator('.task-item-text')).toContainText(
        'The new task description'
      );
    });

    test('is automatically deleted if empty', async ({ page }) => {
      await page.locator('.task-item-text').last().fill('');
      await page.locator('.panel-container').click();

      await page.reload();

      await expect(page.locator('.task-item')).toHaveCount(0);
    });
  });
});
