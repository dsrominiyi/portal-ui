import React from 'react';
import { storiesOf } from '@storybook/react';

import UserImage from '.';

import { smallerImg } from '../../../.storybook/styles.scss';

const stories = storiesOf('UserImage', module);

const render = (name: UserName, imageUrl?: string, additionalClasses?: string[]) => () => (
  <UserImage name={name} imageUrl={imageUrl} additionalClasses={additionalClasses} />
);

const name = { forename: 'John', surname: 'Smith' };
const imageUrl = '/images/person-who-does-not-exist.jpg';

export const storyRenders = {
  noPhoto: render(name),
  withPhoto: render(name, imageUrl),
  extraClass: render(name, imageUrl, [smallerImg])
};

stories.add('With no profile photo', storyRenders.noPhoto);
stories.add('With a profile photo', storyRenders.withPhoto);
stories.add('With additional styling', storyRenders.extraClass);
