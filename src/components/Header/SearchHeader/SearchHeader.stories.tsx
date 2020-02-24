import React from 'react';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import createMockStore from 'redux-mock-store';

import SearchHeader from '.';

const mockStore = createMockStore([]);

const stories = storiesOf('SearchHeader', module);

const render = (search: SearchSuggestionList, user?: User) => () => (
  <Provider store={mockStore({ search, user })}>
    <SearchHeader />
  </Provider>
);

export interface Suggestion {
  id: string;
  score: number;
  suggestion: string;
}

export const storyRenders = {
  noResults: render(
    { query: 'invalid', suggestions: [], found: 4 },
    { name: { forename: 'Test', surname: 'User' }, username: 'testUser' }
  ),
  noUser: render({ query: 'something', suggestions: [], found: 0 }, undefined),
  fourResults: render(
    {
      query: 'test',
      suggestions: [
        { id: 'abc', score: 0, suggestion: 'Aaron Test' },
        { id: 'def', score: 0, suggestion: 'Adrian Test' },
        { id: 'hij', score: 0, suggestion: 'Adam Test' },
        { id: 'klm', score: 0, suggestion: 'Arnold Test' }
      ],
      found: 4
    },
    { name: { forename: 'Test', surname: 'User' }, username: 'testUser' }
  ),
  twelveResults: render(
    {
      query: 'tes',
      found: 12,
      suggestions: [
        { id: 'abcs', score: 0, suggestion: 'Aaron Test' },
        { id: 'defa', score: 0, suggestion: 'Adrian Test' },
        { id: 'hijp', score: 0, suggestion: 'Adam Test' },
        { id: 'klmo', score: 0, suggestion: 'Arnold Test' },
        { id: 'abci', score: 0, suggestion: 'Aaron Test' },
        { id: 'defu', score: 0, suggestion: 'Adrian Test' },
        { id: 'hijy', score: 0, suggestion: 'Adam Test' },
        { id: 'klmt', score: 0, suggestion: 'Arnold Test' },
        { id: 'abcr', score: 0, suggestion: 'Aaron Test' },
        { id: 'defe', score: 0, suggestion: 'Adrian Test' },
        { id: 'hijw', score: 0, suggestion: 'Adam Test' },
        { id: 'klmq', score: 0, suggestion: 'Arnold Test' }
      ]
    },
    { name: { forename: 'Test', surname: 'User' }, username: 'testUser' }
  )
};

stories.add('No results', storyRenders.noResults);
stories.add('Four results', storyRenders.fourResults);
stories.add('Twelve results', storyRenders.twelveResults);
stories.add('No user', storyRenders.noUser);
