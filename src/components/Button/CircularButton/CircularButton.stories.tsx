import React, { ReactNode } from 'react';
import { storiesOf } from '@storybook/react';

import ChevronLeft from 'uikit-icons/lib/ChevronLeft';
import ChevronRight from 'uikit-icons/lib/ChevronRight';

import CircularButton from '.';

const stories = storiesOf('CircularButton', module);

const render = (label: ReactNode) => () => (
  <CircularButton label={label} onClick={() => alert('You clicked!')} />
);

export const storyRenders = {
  leftArrowIcon: render(<ChevronLeft />),
  rightArrowIcon: render(<ChevronRight />)
};

stories.add('Left arrow Icon', storyRenders.leftArrowIcon);
stories.add('Right arrow Icon', storyRenders.rightArrowIcon);
