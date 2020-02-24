import React, { FunctionComponent, ReactNode } from 'react';

import styles from './styles.scss';

interface Props {
  leftItems?: ReactNode[];
  rightItems?: ReactNode[];
}

const renderItems = (items?: ReactNode[]) => {
  return items
    ? items.map((item, key) => (
        <div key={key} className={styles.headerItem}>
          {item}
        </div>
      ))
    : null;
};

export const Header: FunctionComponent<Props> = ({ leftItems, rightItems }: Props) => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.leftItems}>{renderItems(leftItems)}</div>
      <div className={styles.rightItems}>{renderItems(rightItems)}</div>
    </div>
  );
};

Header.displayName = 'Header';
export default Header;
