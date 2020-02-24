import React from 'react';
import { storiesOf } from '@storybook/react';

import QuoteSummary from '.';

const stories = storiesOf('QuoteSummary', module);

const render = (date: string, rate?: number) => (props?: any) => (
  <QuoteSummary key={props && props.key} date={date} rate={rate} />
);

export const storyRenders = {
  withoutRate: render('12/12/2019'),
  withRate: render('12/12/2019', 56.59)
};

stories.add('Without rate', storyRenders.withoutRate);
stories.add('With rate', storyRenders.withRate);
