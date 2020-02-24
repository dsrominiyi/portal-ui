import React, { FunctionComponent, ReactNode, MouseEvent } from 'react';

import PencilIcon from 'uikit-icons/lib/Pencil';
import TrashIcon from 'uikit-icons/lib/Trash';

import Button from '../Button';

import styles from './styles.scss';

export type Row = (string | number | ReactNode | undefined)[];

export interface Props {
  headers: string[];
  rows?: Row[];
  noResults?: string;
  additionalClasses?: string[];
  attributes?: { [attr: string]: string };
  onEdit?(rowIndex: number): void;
  onDelete?(rowIndex: number): void;
  onRowClick?(event: MouseEvent): void;
}

export const TableDisplay: FunctionComponent<Props> = ({
  headers,
  rows,
  noResults,
  additionalClasses = [],
  attributes = {},
  onEdit,
  onDelete,
  onRowClick
}) => {
  const testId = attributes['test-id'];
  const tableRows: ReactNode[] = [];

  const editBtnComponent = (rowIndex: number) => {
    return (
      onEdit && (
        <Button
          label={<PencilIcon viewBox="0 0 20 20" />}
          onClick={() => onEdit(rowIndex)}
          status={Status.Secondary}
          additionalClasses={[styles.controlButton, styles.editButton]}
          attributes={{ 'test-id': testId ? `${testId}_edit-row-${rowIndex}` : '' }}
        />
      )
    );
  };

  const deleteBtnComponent = (rowIndex: number) => {
    return (
      onDelete && (
        <Button
          label={<TrashIcon viewBox="0 0 20 20" />}
          onClick={() => onDelete(rowIndex)}
          status={Status.Danger}
          additionalClasses={[styles.controlButton, styles.deleteButton]}
          attributes={{ 'test-id': testId ? `${testId}_delete-row-${rowIndex}` : '' }}
        />
      )
    );
  };

  if (rows && rows.length) {
    rows.forEach((row: Row, rowIndex: number) => {
      const rowItems: ReactNode[] = row.map((value, cellIndex) => (
        <td key={cellIndex} className={styles.tableCell}>
          {value}
        </td>
      ));

      const editCell = onEdit && (
        <td key={`edit_${rowIndex}`} className={styles.tableCell}>
          {editBtnComponent(rowIndex)}
        </td>
      );

      const deleteCell = onDelete && (
        <td key={`delete_${rowIndex}`} className={styles.tableCell}>
          {deleteBtnComponent(rowIndex)}
        </td>
      );

      const clickableRows = onRowClick ? styles.tableRowClickable : undefined;
      rowItems.push([editCell, deleteCell]);
      tableRows.push(
        <tr
          key={rowIndex}
          test-id={testId ? `${testId}_row-${rowIndex}` : ''}
          onClick={onRowClick}
          className={clickableRows}
        >
          {rowItems}
        </tr>
      );
    });
  }

  const tableHeaders = headers.map((header, i) => (
    <th key={i} className={styles.tableCell}>
      {header}
    </th>
  ));

  const noResultsRow = (
    <tr>
      <td className={styles.tableCell}>{noResults}</td>
    </tr>
  );

  return (
    <table className={[styles.table, ...additionalClasses].join(' ')} {...attributes}>
      <thead className={styles.bottomBorder}>
        <tr>{tableHeaders}</tr>
      </thead>
      <tbody>{tableRows.length ? tableRows : noResultsRow}</tbody>
    </table>
  );
};

TableDisplay.displayName = 'TableDisplay';
export default TableDisplay;
