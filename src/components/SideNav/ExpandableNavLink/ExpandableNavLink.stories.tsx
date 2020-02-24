import React, { ReactNode } from 'react';
import { storiesOf } from '@storybook/react';
import ExpandableNavLink, { SubItem } from '.';
import styles from '../../../../.storybook/styles.scss';

const stories = storiesOf('ExpandableNavLink', module);

export const render = (
  label: string,
  icon: ReactNode,
  subItems: SubItem[],
  isMiniLink?: boolean
) => () => (
  <ExpandableNavLink label={label} icon={icon} subItems={subItems} isMiniLink={isMiniLink} />
);

const renderWithBackground = (renderFunc: () => ReactNode, mini?: boolean) => () => (
  <div className={styles.darkBackground} style={{ width: mini ? 104 : 224 }}>
    {renderFunc()}
  </div>
);

export const testItems = [
  { label: 'New Individual', href: '/newind', onClick: () => alert('You Clicked') },
  { label: 'New Company', href: '/newcompany', onClick: () => alert('You Clicked') },
  { label: 'Find Customer', href: '/search', onClick: () => alert('You Clicked') }
];

const withoutHrefItems = [
  { label: 'New Individual', onClick: () => alert('You Clicked') },
  { label: 'New Company', onClick: () => alert('You Clicked') },
  { label: 'Find Customer', onClick: () => alert('You Clicked') }
];

export const storyRenders = {
  defaultSize: render('Customer', <i className="fas fa-user" />, testItems),
  miniLink: render('Customer', <i className="fas fa-user" />, testItems, true),
  withoutHrefs: render('Customer', <i className="fas fa-user" />, withoutHrefItems)
};

stories.add('Default size', renderWithBackground(storyRenders.defaultSize));
stories.add('Mini link', renderWithBackground(storyRenders.miniLink, true));
stories.add('Without Hrefs', renderWithBackground(storyRenders.withoutHrefs));
