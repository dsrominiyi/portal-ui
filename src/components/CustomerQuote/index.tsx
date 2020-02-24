import React, { FunctionComponent } from 'react';

import PolicyWidget from '../PolicyWidget';
import QuoteSummary from '../QuoteSummary';
import policyTypeMapper from '../../helpers/policyTypeMapper';

interface Props {
  quote: Quote;
}

export const CustomerQuote: FunctionComponent<Props> = ({ quote }: Props) => {
  const type = policyTypeMapper(quote.type);

  if (!type) {
    return null;
  }

  const additionalItems = [
    <QuoteSummary key={quote.id} date={quote.startDate} rate={quote.rate} />
  ];

  return (
    <PolicyWidget key={quote.id} id={quote.id} type={type} additionalItems={additionalItems} />
  );
};

CustomerQuote.displayName = 'CustomerQuote';
export default CustomerQuote;
