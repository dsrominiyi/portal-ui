import React from 'react';
import { storiesOf } from '@storybook/react';
import JourneyProgress, { Step, Props } from '.';

const stories = storiesOf('JourneyProgress', module);

export const render = (steps: Step[], activeStep: number, onClick?: Props['onClick']) => () => (
  <JourneyProgress steps={steps} activeStep={activeStep} onClick={onClick} />
);

export const storyRenders = {
  withFiveSteps: render(
    [
      { title: 'Step One', url: '/step/1' },
      { title: 'Step Two', url: '/step/2' },
      { title: 'Step Three', url: '/step/3' },
      { title: 'Step Four', url: '/step/4' },
      { title: 'Step Five', url: '/step/5' }
    ],
    3
  ),
  withTwoSteps: render(
    [
      { title: 'Step One', url: '/step/1' },
      { title: 'Step Two', url: '/step/2' }
    ],
    0
  ),
  withLongTitles: render(
    [
      { title: 'Vehicle Details', url: '/step/1' },
      { title: 'Driver Details', url: '/step/2' },
      { title: 'Policy Details', url: '/step/3' },
      { title: 'Disestablishmentarianism', url: '/step/4' },
      { title: 'Convictions', url: '/step/5' }
    ],
    0
  ),
  withNoSteps: render([], 0)
};

stories.add('With five steps', storyRenders.withFiveSteps);
stories.add('With two steps', storyRenders.withTwoSteps);
stories.add('With long titles', storyRenders.withLongTitles);
stories.add('With no steps', storyRenders.withNoSteps);
