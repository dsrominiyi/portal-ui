import React from 'react';
import { storiesOf } from '@storybook/react';
import Lookup from '.';

const stories = storiesOf('Lookup', module);

const render = (label?: string, buttonLabel?: string, secondaryButtonLabel?: string) => () => (
  <Lookup
    onClick={() => {}}
    onChange={() => {}}
    label={label}
    buttonLabel={buttonLabel}
    secondaryButtonLabel={secondaryButtonLabel}
    secondaryAction={secondaryButtonLabel && ((() => null) as any)}
  />
);

export const storyRenders = {
  default: render('Postcode', 'Find'),
  secondaryAction: render('Postcode', 'Find', 'Enter Manually'),
  withoutLabel: render()
};

stories.add('Default', storyRenders.default);
stories.add('With secondary action', storyRenders.secondaryAction);
stories.add('Without label', storyRenders.withoutLabel);
