import React from 'react';
import { storiesOf } from '@storybook/react';

import SearchBar from '.';

const stories = storiesOf('SearchBar', module);

const render = (
  hits?: string[],
  buildUrl?: (result: SearchHit) => string,
  buildCustomerResultsUrl?: (term: string) => string
) => {
  const searchResults = {
    found: hits ? hits.length : 0,
    start: 0,
    hit: hits
      ? hits.map((hit: string, index: number) => ({
          id: String(index),
          fields: { id: String(index), text: hit }
        }))
      : ([] as SearchHit[])
  };

  return () => (
    <SearchBar
      searchResults={searchResults}
      searchFetchResults={() => ({
        type: '',
        payload: undefined
      })}
      buildUrl={buildUrl}
      buildMoreResultsUrl={buildCustomerResultsUrl}
    />
  );
};

const buildUrlFunc = (result: SearchHit) => `/customer/${result.fields.id}`;
const moreResultsFunc = (term: string) => `/customer/search/${term}`;

export const storyRenders = {
  noResults: render([]),
  twoResults: render(['Toby Test', 'Tim Test']),
  sixResults: render(['Toby Test', 'Tim Test', 'Tom Test', 'Ted Test', 'Tab Test', 'Tod Test']),
  eightteenResults: render([
    'Toby Test',
    'Tim Test',
    'Tom Test',
    'Ted Test',
    'Tab Test',
    'Tod Test',
    'Toby Test',
    'Tim Test',
    'Tom Test',
    'Ted Test',
    'Tab Test',
    'Tod Test',
    'Toby Test',
    'Tim Test',
    'Tom Test',
    'Ted Test',
    'Tab Test',
    'Tod Test'
  ]),
  withbuildUrlAndBuildResultsUrlUnderTen: render(
    ['Toby Test', 'Tim Test'],
    buildUrlFunc,
    moreResultsFunc
  ),
  withbuildUrlAndBuildResultsUrlOverTen: render(
    [
      'Toby Test',
      'Tim Test',
      'Tom Test',
      'Ted Test',
      'Tab Test',
      'Tod Test',
      'Toby Test',
      'Tim Test',
      'Tom Test',
      'Ted Test',
      'Tab Test',
      'Tod Test',
      'Toby Test',
      'Tim Test',
      'Tom Test',
      'Ted Test',
      'Tab Test',
      'Tod Test'
    ],
    buildUrlFunc,
    moreResultsFunc
  )
};

stories.add('with no hits', storyRenders.noResults);
stories.add('with 2 hits', storyRenders.twoResults);
stories.add('with 6 hits', storyRenders.sixResults);
stories.add('with 18 hits', storyRenders.eightteenResults);
