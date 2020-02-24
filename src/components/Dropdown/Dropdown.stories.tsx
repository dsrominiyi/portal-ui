import React from 'react';
import { storiesOf } from '@storybook/react';
import Dropdown, { PrimitiveOption, DropdownOption, Props } from '.';

const stories = storiesOf('Dropdown', module);

const onChangeDefault = (value: PrimitiveOption) => alert(value);

export const render = (
  options: DropdownOption[],
  selected?: string,
  onChange?: Props['onChange'],
  isInvalid?: boolean
) => (props?: any) => (
  <Dropdown
    key={props && props.key}
    options={options}
    selected={selected}
    onChange={onChange || onChangeDefault}
    isInvalid={isInvalid}
  />
);

export const dropdownTestData = [
  { value: 'value1', text: '1' },
  { value: 'value2', text: '2' },
  { value: 'value3', text: '3' },
  { value: 'value4', text: '4' }
];

const primitiveOptionList = dropdownTestData.map(option => option.text);

export const storyRenders = {
  withoutSelectedValue: render(dropdownTestData),
  withSelectedValue: render(dropdownTestData, 'key2'),
  withPrimitiveOptions: render(primitiveOptionList),
  invalid: render(primitiveOptionList, undefined, undefined, true)
};

stories.add('Without pre-selected value', storyRenders.withoutSelectedValue);
stories.add('With pre-selected value', storyRenders.withSelectedValue);
stories.add('Invalid', storyRenders.invalid);
