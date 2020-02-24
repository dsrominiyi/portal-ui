import React from 'react';
import { storiesOf } from '@storybook/react';

import ExtendedCustomerQuote from '.';

import mockData from '../../../__mocks__/mock-data.json';

const stories = storiesOf('ExtendedCustomerQuote', module);

const fullQuote: Quote = mockData.quotes[0];
const withoutPhoto: Quote = {
  ...fullQuote,
  salesExecutive: {
    name: {
      forename: 'James',
      surname: 'Fowler'
    },
    username: 'Jimmy123'
  }
};
const noRate: Quote = {
  ...fullQuote,
  rate: -1
};
const declined: Quote = {
  ...fullQuote,
  type: 'invalid'
};

const render = (quote: Quote) => () => (
  <ExtendedCustomerQuote quote={quote} onClick={() => alert('You clicked!')} />
);

export const storyRenders = {
  fullQuote: render(fullQuote),
  noPhoto: render(withoutPhoto),
  noRate: render(noRate),
  declined: render(declined)
};

stories.add('Full quote', storyRenders.fullQuote);
stories.add('Without photo', storyRenders.noPhoto);
stories.add('Without rate', storyRenders.noRate);
stories.add('Declined quote', storyRenders.declined);
