import React, { ReactNode } from 'react';
import { storiesOf } from '@storybook/react';

import NavLink from '.';

import styles from '../../../../.storybook/styles.scss';

const stories = storiesOf('NavLink', module);

const onClickDefault = () => alert('You clicked!');

const render = (
  label: string,
  icon: ReactNode,
  href?: string,
  isActive?: boolean,
  isMiniLink?: boolean,
  onClick: () => void = onClickDefault
) => () => (
  <NavLink
    label={label}
    icon={icon}
    href={href}
    isActive={isActive}
    isMiniLink={isMiniLink}
    onClick={href ? undefined : onClick}
  />
);

const renderWithBackground = (renderFunc: () => ReactNode, mini?: boolean) => () => (
  <div className={styles.darkBackground} style={{ width: mini ? 105 : 224 }}>
    {renderFunc()}
  </div>
);

export const storyRenders = {
  withHref: render('Customer Overview', <i className="fas fa-user" />, 'https://www.google.com'),
  withOnClick: render('Policies', <i className="fas fa-folder" />),
  active: render('Diary', <i className="fas fa-calendar-alt" />, undefined, true),
  mini: render('Customer Overview', <i className="fas fa-user" />, undefined, false, true)
};

stories.add('With href', renderWithBackground(storyRenders.withHref));
stories.add('With onClick function', renderWithBackground(storyRenders.withOnClick));
stories.add('With active state', renderWithBackground(storyRenders.active));
stories.add('Mini Link', renderWithBackground(storyRenders.mini, true));
