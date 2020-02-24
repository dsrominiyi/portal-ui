import React, { FunctionComponent, ReactNode } from 'react';
import classNames from 'classnames/bind';

import statusClassMapper from '../../helpers/statusClassMapper';

import styles from './styles.scss';

interface Props {
  icon: ReactNode;
  title: string;
  href?: string;
  newTab?: boolean;
  notificationCount?: number;
  status?: Status;
  additionalClasses?: string[];
  onClick?(): void;
}

const cx = classNames.bind(styles);

export const IconLink: FunctionComponent<Props> = ({
  icon,
  title,
  href,
  newTab,
  notificationCount,
  status = Status.Info,
  onClick,
  additionalClasses = []
}: Props) => {
  const badgeStyle = cx({
    badge: true,
    badgeCount: true,
    ...statusClassMapper(status)
  });
  const classList = [styles.iconLink, ...additionalClasses];
  return (
    <a
      className={classList.join(' ')}
      title={title}
      href={href}
      target={newTab ? '_blank' : undefined}
      onClick={onClick}
    >
      {icon}
      <span className={badgeStyle}>{notificationCount}</span>
    </a>
  );
};

IconLink.displayName = 'IconLink';
export default IconLink;
