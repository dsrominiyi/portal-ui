import React, { FunctionComponent, ReactNode, MouseEvent } from 'react';
import { policyTypeInfoMap, PolicyType } from '../../helpers/policyTypeInfoMap';

import styles from './styles.scss';

interface Props {
  id: string;
  type: PolicyType;
  additionalItems?: ReactNode[];
  onClick?(event: MouseEvent<HTMLDivElement>): void;
}

export const PolicyWidget: FunctionComponent<Props> = ({
  id,
  type,
  additionalItems = [],
  onClick
}) => {
  const { icon, displayName } = policyTypeInfoMap[type];
  const additionalElements = additionalItems.map((item, index) => <div key={index}>{item}</div>);

  return (
    <div className={styles.policyWidgetContainer} onClick={onClick}>
      <div className={styles.textContainer}>
        <h4 title={id}>{id}</h4>
        <span>{displayName}</span>
      </div>
      <div className={styles.iconContainer}>{icon}</div>
      {additionalElements}
    </div>
  );
};

PolicyWidget.displayName = 'PolicyWidget';
export default PolicyWidget;
