import React, { FunctionComponent, MouseEvent } from 'react';
import { utc as moment } from 'moment';
import policyTypeMapper from '../../helpers/policyTypeMapper';
import styles from './styles.scss';
import { policyTypeInfoMap } from '../../helpers/policyTypeInfoMap';
import UserImage from '../UserImage';

interface Props {
  quote: Quote;
  onClick?(event: MouseEvent<HTMLDivElement>): void;
}

export const ExtendedCustomerQuote: FunctionComponent<Props> = ({ quote, onClick }: Props) => {
  const type = policyTypeMapper(quote.type);

  if (!type) {
    return null;
  }

  const { id, startDate, rate, salesExecutive } = quote;
  const { icon, displayName } = policyTypeInfoMap[type];
  const quoteRate = rate > 0 ? `£${rate}` : 'No Quote';

  return (
    <div className={styles.quoteContainer} onClick={onClick}>
      <div className={styles.quoteWidget}>
        <div className={styles.quoteHeader}>Reference</div>
        <h4>{id}</h4>
      </div>
      <div className={styles.quoteWidget}>
        <div className={styles.quoteHeader}>{displayName}</div>
        <div className={styles.iconContainer}>{icon}</div>
      </div>
      <div className={styles.quoteWidgetWide}>
        <div className={styles.quoteHeader}>Inception Date</div>
        <h4>{moment(startDate).format('DD/MM/YYYY')}</h4>
      </div>
      <div className={styles.quoteWidget}>
        <div className={styles.quoteHeader}>Sales Executive</div>
        {salesExecutive && (
          <UserImage
            name={salesExecutive.name}
            additionalClasses={[styles.userImage]}
            imageUrl={salesExecutive.profilePhoto}
          />
        )}
      </div>
      <div className={styles.quoteWidgetWide}>
        <div className={styles.quoteHeader}>Best Rate</div>
        <h4>{quoteRate}</h4>
      </div>
    </div>
  );
};

ExtendedCustomerQuote.displayName = 'ExtendedCustomerQuote';
export default ExtendedCustomerQuote;
