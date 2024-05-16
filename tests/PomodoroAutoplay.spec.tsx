import { test, expect, MountResult } from '@playwright/experimental-ct-react';
import PomodoroTest from '../src/components/PomodoroTest';
import React from 'react';

test.use({ viewport: { width: 400, height: 876 } });
const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

test.describe('Pomodoro', () => {
  let autoplayComponent: MountResult;

  test.beforeEach(async ({ mount }) => {
    autoplayComponent = await mount(<PomodoroTest />);
  });

  test.describe('while autoplay enabled', () => {
    test.beforeEach(async () => {
      await autoplayComponent.locator('#start-button').click();
      await autoplayComponent.locator('#pause-button').click();
    });

    test.describe('and is playing', () => {
      test.beforeEach(async () => {
        await autoplayComponent.locator('#start-button').click();
      });

      test('will play when time runs out', async () => {
        test.setTimeout(65000);
        await wait(62000);
        await autoplayComponent.locator('#pause-button').click();
        await expect(autoplayComponent).toContainText('04:59');
      });

      test('will autoplay when skipped', async () => {
        await autoplayComponent.locator('#skip-button').click();
        await wait(1000);
        await expect(autoplayComponent).toContainText('04:59');
      });
    });
  });
});
