import React from 'react';
import { storiesOf } from '@storybook/react';
import Checkbox from '.';

const stories = storiesOf('Checkbox', module);

const render = (label: string, checked: boolean, isInvalid?: boolean) => () => (
  <Checkbox label={label} checked={checked} onChange={() => null} isInvalid={isInvalid} />
);

export const storyRenders = {
  checked: render('Remember me', true),
  unchecked: render('Remember me', false),
  invalid: render('I agree', false, true)
};

stories.add('Checked', storyRenders.checked);
stories.add('Unchecked', storyRenders.unchecked);
stories.add('Invalid', storyRenders.invalid);
