import React, { FunctionComponent, ChangeEvent } from 'react';
import classNames from 'classnames/bind';

import TickIcon from 'uikit-icons/lib/Check';

import styles from './styles.scss';

interface Props {
  label: string;
  checked: boolean;
  isInvalid?: boolean;
  onChange(event: ChangeEvent<HTMLInputElement>): void;
}

const cx = classNames.bind(styles);

export const Checkbox: FunctionComponent<Props> = ({
  label,
  checked,
  isInvalid,
  onChange
}: Props) => {
  return (
    <div className={styles.checkboxContainer}>
      <input
        type="checkbox"
        className={cx({ checked, checkbox: true, isInvalid })}
        onChange={onChange}
        checked={checked}
      />
      {label}
      {checked && <TickIcon viewBox="0 0 20 20" />}
    </div>
  );
};

Checkbox.displayName = 'Checkbox';
export default Checkbox;
