import React, { FunctionComponent } from 'react';

import styles from './styles.scss';

interface Props {
  policies: Policy[];
}

export const LivePolicies: FunctionComponent<Props> = ({ policies }: Props) => (
  <div className={styles.numberOfPolicies}>
    <div className={styles.policyCount}>{policies.length}</div>
    <div className={styles.policyText}>Live Policies</div>
  </div>
);

LivePolicies.displayName = 'LivePolicies';
export default LivePolicies;
