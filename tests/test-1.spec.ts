import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/panel.html');
  await page.getByText('Dictionary', { exact: true }).click();
  await page.getByText('Dictionary', { exact: true }).click();
  await page.getByText('Notes', { exact: true }).click();
  await page.getByText('To-Do List').click();
  await page.locator('#start-btn').click();
  await page.locator('#pause-btn').click();
  await page.locator('#stop-btn').click();
});