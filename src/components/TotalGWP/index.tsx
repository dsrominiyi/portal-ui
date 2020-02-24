import React, { FunctionComponent } from 'react';

import styles from './styles.scss';

interface Props {
  policies: Policy[];
}

export const getTotalGwp = (policies: Policy[]) => {
  const reducer = (accumulator: number, currentValue: number) => accumulator + currentValue;
  const gwp = policies.map(policy => (policy.rate ? policy.rate : 0));

  return gwp.length ? gwp.reduce(reducer) : 0;
};

export const TotalGWP: FunctionComponent<Props> = ({ policies }) => (
  <div className={styles.totalGwp}>
    <div className={styles.gwpTotal}>{`\u00A3${getTotalGwp(policies)}`}</div>
    <div className={styles.gwpText}>Total GWP</div>
  </div>
);

TotalGWP.displayName = 'TotalGWP';
export default TotalGWP;
