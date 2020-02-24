import React, { FunctionComponent } from 'react';

import AddItemsField from '..';
import AdditionalContactForm from '../../AdditionalContactForm';
import AdditionalContactsTable from './AdditionalContactsTable';

interface Props {
  additionalContacts?: AdditionalContact[];
  onChange(values: AdditionalContact[]): void;
}

export const AddAdditionalContactsField: FunctionComponent<Props> = ({
  additionalContacts,
  onChange
}: Props) => (
  <AddItemsField
    fieldText="Additional contacts (optional)"
    itemName="additional contact"
    form={AdditionalContactForm}
    table={AdditionalContactsTable}
    items={additionalContacts}
    onChange={onChange}
  />
);

AddAdditionalContactsField.displayName = 'AddAdditionalContactsField';
export default AddAdditionalContactsField;
