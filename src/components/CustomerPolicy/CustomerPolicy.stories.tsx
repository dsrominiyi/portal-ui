import React from 'react';
import { storiesOf } from '@storybook/react';
import CustomerPolicy from '.';

const stories = storiesOf('CustomerPolicy', module);

const validPolicy: Policy = {
  id: '12347',
  type: 'pc',
  insurer: 'Bob Smith Ltd',
  startDate: '2019-11-01',
  endDate: '2020-11-01',
  rate: 345.89
};

const invalidPolicy: Policy = {
  id: '12345',
  type: 'invalid',
  insurer: 'We Insure Any Car',
  startDate: '2019-01-01',
  endDate: '2020-01-01'
};

const render = (policy: Policy) => () => <CustomerPolicy policy={policy} />;

const lapsedPolicy: Policy = {
  id: '12347',
  type: 'pc',
  insurer: 'Bob Smith Ltd',
  startDate: '2018-11-01',
  endDate: '2019-11-01'
};

export const storyRenders = {
  validPolicy: render(validPolicy),
  invalidPolicy: render(invalidPolicy),
  lapsedPolicy: render(lapsedPolicy)
};

stories.add('Valid policy', render(validPolicy));
stories.add('Invalid policy', render(invalidPolicy));
stories.add('Lapsed policy', render(lapsedPolicy));
