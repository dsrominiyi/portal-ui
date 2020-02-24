import React from 'react';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import createMockStore from 'redux-mock-store';

import AbiSearch from '.';

const mockStore = createMockStore([]);

const stories = storiesOf('AbiSearch', module);
const initialProps = {
  codeListId: '403',
  onChange: () => null
};

const render = (search: SearchResults, questionId?: string) => () => (
  <Provider store={mockStore({ search, questionId })}>
    <AbiSearch {...initialProps} />
  </Provider>
);

export const storyRenders = {
  searchByDescription: render(
    {
      suggestions: [
        { id: 'abc', score: 0, suggestion: 'Mr' },
        { id: 'def', score: 0, suggestion: 'Mrs' },
        { id: 'hij', score: 0, suggestion: 'Ms' },
        { id: 'klm', score: 0, suggestion: 'Miss' }
      ],
      query: 'mr',
      found: 4
    },
    '403'
  )
};

stories.add('ABI Description as searchterm', storyRenders.searchByDescription);
