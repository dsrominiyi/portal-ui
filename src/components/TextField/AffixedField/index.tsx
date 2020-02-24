import React, { FunctionComponent, ChangeEvent } from 'react';

import TextField from '..';

import styles from './styles.scss';

interface Props {
  prefix?: string;
  suffix?: string;
  value?: string;
  onChange?(event: ChangeEvent<HTMLInputElement>): void;
}

export const AffixedField: FunctionComponent<Props> = ({
  prefix,
  suffix,
  value,
  onChange
}: Props) => {
  return (
    <div className={styles.affixedFieldWrapper}>
      <div className={styles.prefix}>{prefix}</div>
      <TextField onChange={onChange} value={value} />
      <div className={styles.suffix}>{suffix}</div>
    </div>
  );
};

AffixedField.displayName = 'AffixedField';
export default AffixedField;
