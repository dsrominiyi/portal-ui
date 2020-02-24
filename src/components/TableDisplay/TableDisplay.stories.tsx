import React from 'react';
import { storiesOf } from '@storybook/react';
import TableDisplay, { Props } from '.';

const stories = storiesOf('TableDisplay', module);

export const render = (
  headers: Props['headers'],
  rows: Props['rows'],
  noResults = 'No Results',
  onEdit?: Props['onEdit'],
  onDelete?: Props['onDelete'],
  attributes?: Props['attributes']
) => () => (
  <TableDisplay
    headers={headers}
    rows={rows}
    noResults={noResults}
    onEdit={onEdit}
    onDelete={onDelete}
    attributes={attributes}
  />
);

const mockClickFunction = () => alert('Clicked!');

export const headers = ['Driver', 'Date of Birth', 'Licence Number'];
export const rows = [
  ['Mr Ron Invasion', '1983-04-18', 'xxxxxx xxxxx xxxxx'],
  ['Miss Tash Otte', '1984-07-28', 'xxxxxx xxxxx xxxxx'],
  ['Mr E Driver', '1952-09-04', 'xxxxxx xxxxx xxxxx']
];

export const storyRenders = {
  noResults: render(headers, [], 'No Drivers'),
  resultsNoButtons: render(headers, rows, undefined),
  resultsEditButton: render(headers, rows, undefined, mockClickFunction, undefined),
  resultsDeleteButton: render(headers, rows, undefined, undefined, mockClickFunction),
  results: render(headers, rows, '', mockClickFunction, mockClickFunction),
  withTestId: render(headers, rows, '', mockClickFunction, mockClickFunction, {
    'test-id': 'test-table'
  })
};

stories.add('No Results', storyRenders.noResults);
stories.add('With results and edit control button only', storyRenders.resultsEditButton);
stories.add('With results and delete control button only', storyRenders.resultsDeleteButton);
stories.add('With results and both control buttons', storyRenders.results);
stories.add('With results, no buttons', storyRenders.resultsNoButtons);
