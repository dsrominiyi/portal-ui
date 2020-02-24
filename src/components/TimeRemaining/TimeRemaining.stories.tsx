import React from 'react';
import { storiesOf } from '@storybook/react';
import TimeRemaining, { ConfigPercentages } from '.';

const stories = storiesOf('TimeRemaining', module);

const start = '2019-01-01';
const end = '2019-10-01';
const current = '2019-05-01';

const config: ConfigPercentages = {
  green: 0.7,
  amber: 0.1
};

const render = (
  startDate: string = start,
  endDate: string = end,
  currentDate?: string,
  configPercentages?: ConfigPercentages
) => () => (
  <TimeRemaining
    startDate={startDate}
    endDate={endDate}
    currentDate={currentDate}
    configPercentages={configPercentages}
  />
);

export const storyRenders = {
  green: render(start, end, '2019-01-02'),
  amber: render('2019-10-01', '2019-10-20', '2019-10-15'),
  red: render('2019-10-01', '2019-10-10', '2019-10-09'),
  lapsed: render(start, end, '2019-10-05'),
  currentDate: render('2019-10-01', '2020-10-01'),
  customConfig: render(start, end, current, config),
  oneDayRemaining: render(start, end, '2019-10-01')
};

stories.add('Green', storyRenders.green);
stories.add('Amber', storyRenders.amber);
stories.add('Red', storyRenders.red);
stories.add('Lapsed', storyRenders.lapsed);
stories.add('Current date', storyRenders.currentDate);
stories.add('Custom config', storyRenders.customConfig);
stories.add('One day remaining', storyRenders.oneDayRemaining);
