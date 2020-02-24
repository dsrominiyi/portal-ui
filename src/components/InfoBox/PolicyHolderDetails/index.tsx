import React, { FunctionComponent, MouseEvent } from 'react';
import { utc as moment } from 'moment';

import MoreActionsLink from '../../IconLink/MoreActionsLink';
import InfoBox from '..';

import styles from './styles.scss';

export interface CustomerDetails {
  name: string;
  dateOfBirth?: string;
  address: Address;
  contactDetails: Contact[];
}

export interface Props {
  id: string;
  isQuote: boolean;
  policyType: string;
  customerDetails: CustomerDetails;
  onClickAction: (event: MouseEvent) => void;
}

const PolicyHolderDetails: FunctionComponent<Props> = ({
  id,
  isQuote,
  policyType,
  customerDetails,
  onClickAction
}: Props) => {
  const address = Object.values(customerDetails.address)
    .filter(val => val !== undefined && val !== '')
    .join(', ');

  const contacts = customerDetails.contactDetails.map((contact, index) => {
    const newLine = index !== customerDetails.contactDetails.length - 1 ? '\n' : '';
    return `${contact.type[0].toUpperCase() + contact.type.slice(1)}: ${contact.detail}${newLine}`;
  });

  const body = (
    <div className={styles.policyHolderDetails}>
      <p className={styles.header}>Policyholder</p>
      <p className={styles.subHeader}>{customerDetails.name}</p>
      {customerDetails.dateOfBirth && (
        <p className={styles.textSection}>
          {moment(customerDetails.dateOfBirth).format('DD/MM/YYYY')}
        </p>
      )}
      <p className={styles.subHeader}>Address:</p>
      <p className={styles.textSection}>{address}</p>
      <p className={styles.subHeader}>Contact:</p>
      <p className={styles.textSection}>{contacts}</p>
    </div>
  );

  return (
    <InfoBox
      header={`${isQuote ? 'Quote' : 'Policy'}: ${id}`}
      subHeader={policyType}
      moreActions={[<MoreActionsLink key="moreActionsLink" onClick={onClickAction} />]}
      items={[body]}
      additionalHeaderClasses={[styles.infoBoxHeader]}
    />
  );
};

PolicyHolderDetails.displayName = 'PolicyHolderDetails';
export default PolicyHolderDetails;
