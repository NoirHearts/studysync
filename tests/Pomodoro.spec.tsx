import { test, expect, MountResult } from '@playwright/experimental-ct-react';
import Pomodoro from '../src/components/Pomodoro';
import React from 'react';

test.use({ viewport: { width: 400, height: 876 } });
const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

test.describe('Pomodoro', () => {
  let component: MountResult;

  test.beforeEach(async ({ mount }) => {
    component = await mount(<Pomodoro />);
  });

  test('renders correctly', async () => {
    await expect(component).toContainText('25:00');
  });

  test.describe('while uninitialized', () => {
    test('does nothing when skipped', async () => {
      await component.locator('#skip-btn').click();
      await expect(component).toContainText('25:00');
    });

    test('decrements when played', async () => {
      await component.locator('#start-btn').click();
      await wait(1000);
      await expect(component).toContainText('24:59');
    });
  });
  test.describe('while initialized', () => {
    test.beforeEach(async () => {
      await component.locator('#start-btn').click();
      await component.locator('#pause-btn').click();
    });

    test.describe('and is playing', () => {
      test.beforeEach(async () => {
        await component.locator('#start-btn').click();
        await wait(1000);
      });

      test('will stop when paused', async () => {
        await component.locator('#pause-btn').click();
        await expect(component).toContainText('24:59');
      });

      test('will go to next mode when skipped', async () => {
        await component.locator('#skip-btn').click();
        await expect(component).toContainText('5:00');
      });
    });

    test.describe('and is paused', () => {
      test.beforeEach(async () => {
        await component.locator('#start-btn').click();
        await wait(1000);
        await component.locator('#pause-btn').click();
      });

      test('will resume when played', async () => {
        await component.locator('#start-btn').click();
        await wait(1000);
        await expect(component).toContainText('24:58');
      });

      test('will go to next mode when skipped', async () => {
        await component.locator('#skip-btn').click();
        await expect(component).toContainText('5:00');
      });
    });
  });
});
