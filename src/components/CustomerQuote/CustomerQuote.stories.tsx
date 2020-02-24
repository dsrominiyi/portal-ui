import React from 'react';
import { storiesOf } from '@storybook/react';

import CustomerQuote from '.';

import mockData from '../../../__mocks__/mock-data.json';

const stories = storiesOf('CustomerQuote', module);

const validQuote: Quote = mockData.quotes[0];
const declinedQuote: Quote = mockData.quotes[2];
const invalidQuote: Quote = {
  ...validQuote,
  type: 'invalid'
};

const render = (quote: Quote) => () => <CustomerQuote quote={quote} />;

export const storyRenders = {
  validQuote: render(validQuote),
  invalidQuote: render(invalidQuote)
};

stories.add('Valid quote', render(validQuote));
stories.add('Declined quote', render(declinedQuote));
stories.add('Invalid quote', render(invalidQuote));
