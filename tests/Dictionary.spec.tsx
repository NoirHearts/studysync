import { test, expect, MountResult } from '@playwright/experimental-ct-react';
import Dictionary from '../src/pages/Panel/subpanel/Dictionary';
import React from 'react';

test.use({ viewport: { width: 400, height: 876 } });

test.describe('Dictionary', () => {
  let component: MountResult;

  test.beforeEach(async ({ mount }) => {
    component = await mount(<Dictionary />);
  });

  test('renders correctly', async () => {
    await expect(
      component.getByPlaceholder('Type a word to search...')
    ).toBeVisible();
  });

  test('search succeeds if word is valid', async () => {
    await component
      .getByPlaceholder('Type a word to search...')
      .fill('dictionary');
    await component.locator('#search-btn').click();
    await expect(component.locator('.word')).toContainText('dictionary');
  });

  test.describe('search fails with proper error message', () => {
    test('if word is invalid', async () => {
      await component.getByPlaceholder('Type a word to search...').fill('morb');
      await component.locator('#search-btn').click();
      await expect(component.locator('.error-msg')).toContainText(
        'Word does not have a dictionary entry'
      );
    });

    test('if searching more than one word at once', async () => {
      await component
        .getByPlaceholder('Type a word to search...')
        .fill('hello world');
      await component.locator('#search-btn').click();
      await expect(component.locator('.error-msg')).toContainText(
        'Please only search one word at a time'
      );
    });

    // test("if can't connect to the api", async () => {
    //   await component.getByPlaceholder('Type a word to search...').fill('');
    //   await component.locator('#search-btn').click();
    //   await expect(component.locator('.error-msg')).toContainText('Timeout');
    // });
  });
});
