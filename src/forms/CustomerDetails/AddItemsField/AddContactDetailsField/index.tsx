import React, { FunctionComponent } from 'react';

import AddItemsField from '..';
import ContactDetailForm from '../../ContactDetailForm';
import ContactDetailsTable from './ContactDetailsTable';

interface Props {
  contactDetails?: Contact[];
  hasError?: boolean;
  onChange(values: Contact[]): void;
}

export const AddContactDetailsField: FunctionComponent<Props> = ({
  contactDetails,
  hasError,
  onChange
}: Props) => (
  <AddItemsField
    fieldText="Contact details"
    itemName="contact"
    form={ContactDetailForm}
    table={ContactDetailsTable}
    items={contactDetails}
    hasError={hasError}
    errorText="Please add at least one method of contact"
    onChange={onChange}
  />
);

AddContactDetailsField.displayName = 'AddContactDetailsField';
export default AddContactDetailsField;
