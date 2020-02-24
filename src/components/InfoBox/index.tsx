import React, { FunctionComponent, ReactNode } from 'react';
import classNames from 'classnames/bind';

import styles from './styles.scss';

interface Props {
  items?: ReactNode[];
  header?: string;
  subHeader?: string;
  moreActions?: ReactNode[];
  hideHeaderDivider?: boolean;
  useDivider?: boolean;
  additionalClasses?: string[];
  additionalHeaderClasses?: string[];
}

const cx = classNames.bind(styles);

export const InfoBox: FunctionComponent<Props> = ({
  items = [],
  header,
  subHeader,
  moreActions = [],
  hideHeaderDivider,
  useDivider,
  additionalClasses = [],
  additionalHeaderClasses = []
}: Props) => {
  const listItems = items.map((item, i) => (
    <div key={i} className={cx({ useDivider, item: true })}>
      {item}
    </div>
  ));
  const headerDivide = !hideHeaderDivider ? items.length : undefined;

  return (
    <div className={[styles.infoBox, ...additionalClasses].join(' ')}>
      {header && (
        <div className={cx({ topContainer: true, headerDivide })}>
          <div className={styles.headerContainer}>
            <div
              className={[
                cx({
                  header: true,
                  withSubHeader: subHeader
                }),
                ...additionalHeaderClasses
              ].join(' ')}
            >
              {header}
            </div>
            {!!moreActions.length && <div className={styles.moreAction}>{...moreActions}</div>}
          </div>
          {subHeader && <div className={styles.subHeader}>{subHeader}</div>}
        </div>
      )}

      <div className={styles.itemList}>{listItems}</div>
    </div>
  );
};

InfoBox.displayName = 'InfoBox';
export default InfoBox;
