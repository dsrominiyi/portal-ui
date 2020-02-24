import React, { FunctionComponent, Fragment } from 'react';

import TextField from '../../../components/TextField';

import { stripNonNumeric } from '../../../helpers/utilFuncs';

import styles from './styles.scss';

export interface Props {
  values: DateFieldValues;
  isInvalid?: boolean;
  testId?: string;
  onChange(values: DateFieldValues): void;
}

const addLeadingZero = (value: string) => (value.length === 1 ? `0${value}` : value);

export const DateFields: FunctionComponent<Props> = ({
  values: { dd, mm, yyyy },
  isInvalid,
  testId = '',
  onChange
}: Props) => {
  const updateDay = (value: string) => onChange({ dd: stripNonNumeric(value), mm, yyyy });
  const updateMonth = (value: string) => onChange({ dd, mm: stripNonNumeric(value), yyyy });
  const updateYear = (value: string) => onChange({ dd, mm, yyyy: stripNonNumeric(value) });

  return (
    <Fragment>
      <TextField
        label="Day"
        placeholder="DD"
        value={dd}
        maxLength={2}
        additionalClasses={[styles.dateField]}
        isInvalid={isInvalid}
        onChange={event => updateDay(event.target.value)}
        onBlur={event => updateDay(addLeadingZero(event.target.value))}
        attributes={{ 'test-id': testId ? `${testId}_day` : '' }}
      />
      <TextField
        label="Month"
        placeholder="MM"
        value={mm}
        maxLength={2}
        additionalClasses={[styles.dateField]}
        isInvalid={isInvalid}
        onChange={event => updateMonth(event.target.value)}
        onBlur={event => updateMonth(addLeadingZero(event.target.value))}
        attributes={{ 'test-id': testId ? `${testId}_month` : '' }}
      />
      <TextField
        label="Year"
        placeholder="YYYY"
        value={yyyy}
        maxLength={4}
        additionalClasses={[styles.dateField]}
        isInvalid={isInvalid}
        onChange={event => updateYear(event.target.value)}
        attributes={{ 'test-id': testId ? `${testId}_year` : '' }}
      />
    </Fragment>
  );
};

DateFields.displayName = 'DateFields';
export default DateFields;
