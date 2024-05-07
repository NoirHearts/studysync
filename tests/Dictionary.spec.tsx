import { test, expect, MountResult } from '@playwright/experimental-ct-react';
import Dictionary from '../src/components/Dictionary';
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
    await component.locator('#search-button').click();
    await expect(component.locator('.word')).toContainText('dictionary');
  });

  test('search succeeds for entries with n > 1 words', async () => {
    await component
      .getByPlaceholder('Type a word to search...')
      .fill('state of emergency');
    await component.locator('#search-button').click();
    await expect(component.locator('.word')).toContainText(
      'state of emergency'
    );
  });

  test.describe('search fails with proper error message', () => {
    test('if word is invalid', async () => {
      await component.getByPlaceholder('Type a word to search...').fill('morb');
      await component.locator('#search-button').click();
      await expect(component.locator('.error-msg')).toContainText(
        'Word does not have a dictionary entry'
      );
    });

    // test("if can't connect to the api", async () => {
    //   await component.getByPlaceholder('Type a word to search...').fill('');
    //   await component.locator('#search-button').click();
    //   await expect(component.locator('.error-msg')).toContainText('Timeout');
    // });
  });
});
