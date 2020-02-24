import React, { FunctionComponent, ReactNode, MouseEvent } from 'react';
import classnames from 'classnames/bind';

import Link from '../../Link';

import styles from './styles.scss';

interface Props {
  label: string;
  icon: ReactNode;
  href?: string;
  isActive?: boolean;
  isMiniLink?: boolean;
  onClick?(event: MouseEvent): void;
}

const cx = classnames.bind(styles);

export const NavLink: FunctionComponent<Props> = ({
  label,
  icon,
  href,
  isActive,
  isMiniLink,
  onClick
}: Props) => (
  <Link
    classNames={[
      cx({
        navLink: true,
        active: isActive,
        mini: isMiniLink
      })
    ]}
    label={label}
    icon={icon}
    href={href}
    onClick={onClick}
  />
);

NavLink.displayName = 'NavLink';
export default NavLink;
