import React from 'react';
import { storiesOf } from '@storybook/react';
import PolicyHolderDetails, { CustomerDetails } from '.';

const stories = storiesOf('PolicyHolderDetails', module);

const testCustomerDetails = {
  name: 'Mr John Smith',
  dateOfBirth: '1987-12-09',
  address: {
    buildingNumber: '12',
    thoroughfare: 'St Peters Road',
    subThoroughfare: 'Fib Street',
    locality: 'Manchester',
    town: 'Bury',
    county: 'Greater Manchester',
    postcode: 'BL90DN'
  },
  contactDetails: [
    { type: ContactType.WorkNumber, detail: '0800000000' },
    { type: ContactType.MobileNumber, detail: '07790000000' },
    { type: ContactType.WorkEmail, detail: 'john.smith@datamatters.co.uk' }
  ]
};

const render = (
  id: string,
  isQuote: boolean,
  policyType: string,
  customerDetails: CustomerDetails
) => () => {
  return (
    <PolicyHolderDetails
      id={id}
      isQuote={isQuote}
      policyType={policyType}
      customerDetails={customerDetails}
      onClickAction={() => alert('You clicked!')}
    />
  );
};

export const storyRenders = {
  quote: render('12345', true, 'Private Car', testCustomerDetails),
  policy: render('12345', false, 'Private Car', testCustomerDetails)
};

stories.add('Quote', storyRenders.quote);
stories.add('Policy', storyRenders.policy);
