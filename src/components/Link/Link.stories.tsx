import React from 'react';
import { storiesOf } from '@storybook/react';

import Link from '.';

import { customLink } from '../../../.storybook/styles.scss';

const stories = storiesOf('Link', module);

const render = (
  label: string,
  href?: string,
  classNames?: string[],
  onClick: () => void = () => alert('You clicked!')
) => () => (
  <Link
    classNames={classNames}
    label={label}
    href={href}
    newTab={!!href}
    onClick={href ? undefined : onClick}
  />
);

export const storyRenders = {
  withHref: render('Google', 'https://www.google.com'),
  withOnClick: render('Click me!'),
  customStyling: render('Click me!', undefined, [customLink])
};

stories.add('With href', storyRenders.withHref);
stories.add('With onClick function', storyRenders.withOnClick);
stories.add('With custom styling', storyRenders.customStyling);
