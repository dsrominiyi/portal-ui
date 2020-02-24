import React, { FunctionComponent } from 'react';

import TableDisplay from '../../../../../components/TableDisplay';

import styles from './styles.scss';

export const ContactDetailsTable: FunctionComponent<ItemTableProps> = ({
  items: contactDetails,
  onEdit,
  onDelete
}: ItemTableProps) => {
  const rows = (contactDetails as Contact[]).map(contact => {
    const { type, detail } = contact;
    return [`${type}: ${detail}`];
  });

  return (
    <TableDisplay
      additionalClasses={[styles.contactDetailsTable]}
      headers={['Contact']}
      rows={rows}
      onEdit={onEdit}
      onDelete={onDelete}
      attributes={{ 'test-id': 'contact-details-table' }}
    />
  );
};

ContactDetailsTable.displayName = 'ContactDetailsTable';
export default ContactDetailsTable;
