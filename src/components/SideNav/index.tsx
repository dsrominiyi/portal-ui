import React, { FunctionComponent, MouseEvent, ReactNode, useState } from 'react';
import classnames from 'classnames/bind';

import ChevronLeft from 'uikit-icons/lib/ChevronLeft';
import ChevronRight from 'uikit-icons/lib/ChevronRight';

import NavLink from './NavLink';
import ExpandableNavLink, { SubItem } from './ExpandableNavLink';
import CircularButton from '../Button/CircularButton';

import styles from './styles.scss';

interface SingleLink {
  icon: ReactNode;
  label: string;
  href?: string;
  isActive?: boolean;
  onClick?(event: MouseEvent): void;
}

interface ExpandableLink {
  icon: ReactNode;
  label: string;
  isActive?: boolean;
  subItems: SubItem[];
}

type Divider = '-';

export type NavItem = SingleLink | ExpandableLink | Divider;

export interface Props {
  items?: NavItem[];
  header?: ReactNode;
  miniHeader?: ReactNode;
}

const cx = classnames.bind(styles);

const isSingleLink = (item: NavItem): item is SingleLink => {
  return (
    typeof item !== 'string' &&
    typeof (item as SingleLink).label === 'string' &&
    (item as ExpandableLink).subItems === undefined
  );
};

const isExpandableLink = (item: NavItem): item is ExpandableLink => {
  return typeof item !== 'string' && (item as ExpandableLink).subItems !== undefined;
};

const isDivider = (item: NavItem): item is Divider => item === '-';

export const SideNav: FunctionComponent<Props> = ({ items = [], header, miniHeader }: Props) => {
  const [isMiniNav, toggleMiniNav] = useState(false);

  const renderedItems = items.map((item, index) => {
    if (isSingleLink(item)) {
      return <NavLink key={item.label} {...item} isMiniLink={isMiniNav} />;
    }
    if (isExpandableLink(item)) {
      return <ExpandableNavLink key={item.label} {...item} isMiniLink={isMiniNav} />;
    }
    if (isDivider(item)) {
      return <div key={index} className={styles.divider} />;
    }
    return undefined;
  });

  const showHeader = (header && !isMiniNav) || (miniHeader && isMiniNav);

  return (
    <div className={cx({ sideNav: true, mini: isMiniNav })}>
      {showHeader && (
        <div className={styles.headerContainer}>{isMiniNav ? miniHeader : header}</div>
      )}
      {renderedItems}
      <div className={styles.toggleButton}>
        <CircularButton
          label={isMiniNav ? <ChevronRight /> : <ChevronLeft />}
          onClick={() => toggleMiniNav(!isMiniNav)}
        />
      </div>
    </div>
  );
};

SideNav.displayName = 'SideNav';
export default SideNav;
