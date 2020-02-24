import React, { FunctionComponent } from 'react';

import AddItemsField from '..';
import AddressForm from '../../AddressForm';
import AddressesTable from './AddressesTable';

interface Props {
  customerType: CustomerType;
  addresses?: Address[];
  hasError?: boolean;
  onChange(values: Address[]): void;
}

export const AddAddressesField: FunctionComponent<Props> = ({
  customerType,
  addresses,
  hasError,
  onChange
}: Props) => (
  <AddItemsField
    itemName="address"
    form={AddressForm}
    table={AddressesTable}
    items={addresses}
    formConfig={{ customerType }}
    hasError={hasError}
    errorText="Please add at least one address"
    onChange={onChange}
  />
);

AddAddressesField.displayName = 'AddAddressesField';
export default AddAddressesField;
