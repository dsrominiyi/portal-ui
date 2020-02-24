import React from 'react';
import { storiesOf } from '@storybook/react';
import TotalGWP from '.';

import mockData from '../../../__mocks__/mock-data.json';

const stories = storiesOf('TotalGWP', module);

export const render = (policies: Policy[]) => () => <TotalGWP policies={policies} />;

export const storyRenders = {
  withPolicies: render(mockData.policies),
  withNoPolicies: render([])
};

stories.add('With Policies', storyRenders.withPolicies);
stories.add('With No Policies', storyRenders.withNoPolicies);
