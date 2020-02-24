import React, { FunctionComponent } from 'react';

import TableDisplay from '../../../../../components/TableDisplay';

import styles from './styles.scss';

export const AddressesTable: FunctionComponent<ItemTableProps> = ({
  items: addresses,
  onEdit,
  onDelete
}: ItemTableProps) => {
  const rows = (addresses as Address[]).map(address => {
    return [
      `${address.buildingNumber || address.buildingName}, ${address.thoroughfare}, ${
        address.postcode
      }`,
      `${address.type || ''}`
    ];
  });

  return (
    <TableDisplay
      additionalClasses={[styles.addressesTable]}
      headers={['Address', 'Type']}
      rows={rows}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
};

AddressesTable.displayName = 'AddressesTable';
export default AddressesTable;
