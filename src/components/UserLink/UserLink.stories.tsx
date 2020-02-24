import React from 'react';
import { storiesOf } from '@storybook/react';

import UserLink from '.';

const stories = storiesOf('UserLink', module);

const render = (name: UserName, imageUrl?: string) => () => (
  <UserLink name={name} imageUrl={imageUrl} />
);

const name = { forename: 'John', surname: 'Smith' };

export const storyRenders = {
  noPhoto: render(name),
  withPhoto: render(name, '/images/person-who-does-not-exist.jpg')
};

stories.add('With no profile photo', storyRenders.noPhoto);
stories.add('With a profile photo', storyRenders.withPhoto);
