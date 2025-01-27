import React from 'react';
import { render, screen } from '@testing-library/react';
import { composeStories, composeStory } from '../../../dist/index';

import * as stories from './Button.stories';

// example with composeStories, returns an object with all stories composed with args/decorators
const { Primary } = composeStories(stories);

// example with composeStory, returns a single story composed with args/decorators
const Secondary = composeStory(stories.Secondary, stories.default);

test('renders primary button', () => {
  render(<Primary>Hello world</Primary>);
  const buttonElement = screen.getByText(/Hello world/i);
  expect(buttonElement).not.toBeNull();
});

test('reuses args from composed story', () => {
  render(<Secondary />);
  const buttonElement = screen.getByText(/Children coming from story args!/i);
  expect(buttonElement).not.toBeNull();
});

test('onclick handler is called', async () => {
  const onClickSpy = jest.fn();
  render(<Secondary onClick={onClickSpy} />);
  const buttonElement = screen.getByRole('button');
  buttonElement.click();
  expect(onClickSpy).toHaveBeenCalled();
});

/**
 * FIXME: this would only work in typescript projects when composeStories returns type Story<Partial<Props>>.
 * It breaks now because Primary contains non-optional props.
 * */
// eslint-disable-next-line jest/no-commented-out-tests
// test('reuses args from composeStories', () => {
//   const { getByText } = render(<Primary />);
//   const buttonElement = getByText(/foo/i);
//   expect(buttonElement).not.toBeNull();
// });
