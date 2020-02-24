import React from 'react';
import { storiesOf } from '@storybook/react';

import MultiChoice from '.';

const stories = storiesOf('MultiChoice', module);

export const render = (
  options: string[],
  selectedOption?: string,
  multiSelect?: boolean,
  selectedOptions?: string[],
  disabledOptions?: string[]
) => (props?: any) => (
  <MultiChoice
    options={options}
    onClick={(props && props.onClick) || (() => null)}
    selectedOption={selectedOption}
    multiSelect={multiSelect}
    selectedOptions={selectedOptions}
    disabledOptions={disabledOptions}
  />
);

export const options = ['Car Park', 'Garage', 'Road', 'Off-road'];

export const storyRenders = {
  notSelected: render(options),
  selected: render(options, options[1]),
  multiSelect: render(options, undefined, true, [options[0], options[2]]),
  disabledOptions: render(options, undefined, true, [], [options[0], options[2]])
};

stories.add('Not selected', storyRenders.notSelected);
stories.add('Selected', storyRenders.selected);
stories.add('Multi-select', storyRenders.multiSelect);
stories.add('Disabled options', storyRenders.disabledOptions);
