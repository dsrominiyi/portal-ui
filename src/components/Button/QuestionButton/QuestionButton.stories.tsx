import React from 'react';
import { storiesOf } from '@storybook/react';

import QuestionButton from '.';

const stories = storiesOf('QuestionButton', module);

const render = (label: string, isActive?: boolean, isDisabled?: boolean) => () => (
  <QuestionButton
    label={label}
    onClick={() => alert('You clicked!')}
    isActive={isActive}
    isDisabled={isDisabled}
  />
);

export const storyRenders = {
  active: render('Car Park', true),
  inactive: render('Car Park'),
  disabled: render('Car Park', false, true)
};

stories.add('Active', storyRenders.active);
stories.add('Inactive', storyRenders.inactive);
stories.add('Disabled', storyRenders.disabled);
