import React from 'react';
import { storiesOf } from '@storybook/react';

import ValidationErrorsNotification from '.';

const stories = storiesOf('ValidationErrorsNotification', module);

const render = () => () => <ValidationErrorsNotification />;

export const fieldValues = { dd: '03', mm: '01', yyyy: '2020' };

export const storyRenders = {
  default: render()
};

stories.add('Default', storyRenders.default);
