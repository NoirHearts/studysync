import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Panel from '../pages/Panel/Panel';

test('renders header', () => {
  const { container } = render(<Panel />);

  const element = container.querySelector('.name-header');
  expect(element).toHaveTextContent('StudySync');
});
