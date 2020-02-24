import React, { FunctionComponent, ReactNode, MouseEvent } from 'react';

import styles from './styles.scss';

interface Props {
  label: ReactNode;
  icon?: ReactNode;
  href?: string;
  newTab?: boolean;
  classNames?: string[];
  onClick?(event: MouseEvent): void;
}

export const Link: FunctionComponent<Props> = ({
  label,
  icon,
  href,
  newTab,
  classNames,
  onClick
}: Props) => (
  <a
    className={classNames ? classNames.join('') : styles.link}
    href={href}
    target={!onClick && newTab ? '_blank' : undefined}
    onClick={onClick}
  >
    {icon}
    {label}
  </a>
);

Link.displayName = 'Link';
export default Link;
