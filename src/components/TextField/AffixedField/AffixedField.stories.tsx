import React from 'react';
import { storiesOf } from '@storybook/react';
import AffixedField from '.';

const stories = storiesOf('AffixedField', module);

const render = (prefix?: string, suffix?: string) => (props?: any) => (
  <AffixedField key={props && props.key} prefix={prefix} suffix={suffix} onChange={() => null} />
);

export const storyRenders = {
  prefixed: render('\u00A3', undefined),
  suffixed: render(undefined, 'miles'),
  prefixedSuffixed: render('\u00A3', 'per month')
};

stories.add('Prefixed Field', storyRenders.prefixed);
stories.add('Suffixed Field', storyRenders.suffixed);
stories.add('Prefixed And Suffixed Field', storyRenders.prefixedSuffixed);
