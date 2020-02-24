import React, { FunctionComponent } from 'react';
import classnames from 'classnames/bind';

import formStyles from '../../forms/styles.scss';
import styles from './styles.scss';

export type PrimitiveOption = string | number;

type ObjectOption = {
  text: string;
  value: PrimitiveOption;
};

export type DropdownOption = ObjectOption | PrimitiveOption;

export interface Props {
  label?: string;
  options: DropdownOption[];
  selected?: PrimitiveOption;
  placeholder?: string;
  isInvalid?: boolean;
  attributes?: { [attr: string]: string };
  onChange(value: PrimitiveOption): void;
}

const cx = classnames.bind(styles);

const isPrimitiveOption = (option: DropdownOption): option is PrimitiveOption => {
  return typeof option === 'string' || typeof option === 'number';
};

export const Dropdown: FunctionComponent<Props> = ({
  label,
  options,
  selected,
  placeholder,
  isInvalid,
  attributes = {},
  onChange
}: Props) => {
  const optionValues = options.map((option: DropdownOption) => {
    const value = isPrimitiveOption(option) ? option : option.value;
    const text = isPrimitiveOption(option) ? option : option.text;

    return (
      <option key={value} value={value}>
        {text}
      </option>
    );
  });

  return (
    <div>
      {label && <div className={formStyles.label}>{label}</div>}
      <select
        className={cx({ dropdown: true, isInvalid })}
        onChange={event => onChange(event.target.value)}
        value={selected || ''}
        {...attributes}
      >
        <option key={0} value="" disabled>
          {placeholder || '- Select -'}
        </option>
        {optionValues}
      </select>
    </div>
  );
};

Dropdown.displayName = 'Dropdown';
export default Dropdown;
