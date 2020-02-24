import React from 'react';
import { storiesOf } from '@storybook/react';

import IconLinkAction from '.';

const stories = storiesOf('MoreActionsLink', module);

const render = (onClick: () => void) => (props?: any) => (
  <IconLinkAction key={props && props.key} onClick={onClick} />
);

export const storyRenders = {
  moreIcon: render(() => alert('You clicked!'))
};

stories.add('With on click', storyRenders.moreIcon);
