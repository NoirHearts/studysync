import { test, expect } from '@playwright/experimental-ct-react';
import Pomodoro from '../src/pages/Panel/subpanel/Pomodoro';
import React from 'react';

test.use({ viewport: { width: 500, height: 500 } });

test.describe('Pomodoro', () => {
  test('renders correctly', async ({ mount }) => {
    const component = await mount(<Pomodoro />);
    await expect(component).toContainText('25:00');
  });
});
