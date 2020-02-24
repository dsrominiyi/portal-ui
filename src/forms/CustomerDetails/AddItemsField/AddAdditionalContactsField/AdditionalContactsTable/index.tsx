import React, { FunctionComponent } from 'react';

import TableDisplay from '../../../../../components/TableDisplay';

import { getIndividualFullName } from '../../../../../helpers/customerHelper';

import styles from './styles.scss';

export const AdditionalContactsTable: FunctionComponent<ItemTableProps> = ({
  items: additionalContacts,
  onEdit,
  onDelete
}: ItemTableProps) => {
  const rows = (additionalContacts as AdditionalContact[]).map(contact => {
    const { type, detail } = contact.contactDetails[0];
    return [getIndividualFullName(contact.name), `${type}: ${detail}`, contact.relationship];
  });

  return (
    <TableDisplay
      additionalClasses={[styles.additionalContactsTable]}
      headers={['Name', 'Contact', 'Relationship']}
      rows={rows}
      onEdit={onEdit}
      onDelete={onDelete}
      attributes={{ 'test-id': 'additional-contacts-table' }}
    />
  );
};

AdditionalContactsTable.displayName = 'AdditionalContactsTable';
export default AdditionalContactsTable;
