import React from 'react';
import { storiesOf } from '@storybook/react';
import AddressForm, { emptyAddress } from './index';

const stories = storiesOf('AddressForm', module);

export const formData: any = {};

const save = (data: any) => {
  Object.keys(save).forEach(itemKey => {
    formData[itemKey] = data[itemKey];
  });
};

const render = (address?: Address) => () => (
  <AddressForm initialValues={address} onChange={() => save(formData)} key="address" />
);

export const storyRenders = {
  emptyAddress: render(emptyAddress),
  noAddress: render()
};

stories.add('Empty Address', storyRenders.emptyAddress);
stories.add('No Address', storyRenders.noAddress);
