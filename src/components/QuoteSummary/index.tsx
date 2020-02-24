import React, { FunctionComponent } from 'react';

import styles from './styles.scss';

interface Props {
  date: string;
  rate?: number;
}

export const QuoteSummary: FunctionComponent<Props> = ({ date, rate }: Props) => {
  const rateText = rate ? ` \u00A3${rate}` : 'No Rates';

  return (
    <div className={styles.quoteSummary}>
      <div>Inception Date</div>
      <div>{date}</div>
      <div className={styles.rates}>{rateText}</div>
    </div>
  );
};

QuoteSummary.displayName = 'QuoteSummary';
export default QuoteSummary;
