import React from 'react';
import { storiesOf } from '@storybook/react';

import DateFields from '.';

const stories = storiesOf('DateFields', module);

const render = (values: DateFieldValues) => (props?: any) => (
  <DateFields values={values} onChange={props && props.onChange} />
);

export const fieldValues = { dd: '03', mm: '01', yyyy: '2020' };

export const storyRenders = {
  noValues: render({ dd: '', mm: '', yyyy: '' }),
  withValues: render(fieldValues)
};

stories.add('No values', storyRenders.noValues);
stories.add('With values', storyRenders.withValues);
