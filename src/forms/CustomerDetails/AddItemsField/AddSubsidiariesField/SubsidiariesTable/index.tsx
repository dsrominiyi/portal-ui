import React, { FunctionComponent } from 'react';
import { utc as moment } from 'moment';

import TableDisplay from '../../../../../components/TableDisplay';

import styles from './styles.scss';

export const SubsidiariesTable: FunctionComponent<ItemTableProps> = ({
  items: subsidiaries,
  onEdit,
  onDelete
}: ItemTableProps) => {
  const rows = (subsidiaries as Company[]).map(
    ({ companyName, tradingName, typeStatus, tradingSinceDate, registeredCoNumber }) => [
      companyName,
      tradingName,
      typeStatus,
      tradingSinceDate ? moment(tradingSinceDate, 'YYYY-MM-DD').format('DD/MM/YYYY') : '',
      registeredCoNumber
    ]
  );

  return (
    <TableDisplay
      additionalClasses={[styles.subsidiariesTable]}
      headers={[
        'Company Name',
        'Trading Name',
        'Legal Status',
        'Trading Since',
        'Registration Number'
      ]}
      rows={rows}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
};

SubsidiariesTable.displayName = 'SubsidiariesTable';
export default SubsidiariesTable;
