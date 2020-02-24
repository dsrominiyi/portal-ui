import React, { FunctionComponent } from 'react';

import PolicyWidget from '../PolicyWidget';
import TimeRemaining from '../TimeRemaining';
import policyTypeMapper from '../../helpers/policyTypeMapper';

import styles from './styles.scss';

interface Props {
  policy: Policy;
}

export const CustomerPolicy: FunctionComponent<Props> = ({ policy }: Props) => {
  const type = policyTypeMapper(policy.type);

  if (!type) {
    return null;
  }

  const additionalItems = [
    <div className={styles.timeRemainingContainer} key={policy.id}>
      <TimeRemaining startDate={policy.startDate} endDate={policy.endDate} />
    </div>
  ];

  return <PolicyWidget id={policy.id} type={type} additionalItems={additionalItems} />;
};

CustomerPolicy.displayName = 'CustomerPolicy';
export default CustomerPolicy;
