import React, { FunctionComponent, ChangeEvent, ReactNode } from 'react';
import classnames from 'classnames/bind';

import formStyles from '../../forms/styles.scss';
import styles from './styles.scss';

export interface Props {
  additionalClasses?: string[];
  label?: string;
  value?: string | number | string[];
  placeholder?: string;
  password?: boolean;
  maxLength?: number;
  icon?: ReactNode;
  reverseIconPosition?: boolean;
  isInvalid?: boolean;
  attributes?: { [attr: string]: string };
  onChange?(event: ChangeEvent<HTMLInputElement>): void;
  onBlur?(event: ChangeEvent<HTMLInputElement>): void;
  onFocus?(event: ChangeEvent<HTMLInputElement>): void;
}

const cx = classnames.bind(styles);

export const TextField: FunctionComponent<Props> = ({
  additionalClasses = [],
  password,
  label,
  value,
  placeholder,
  maxLength,
  icon,
  reverseIconPosition,
  isInvalid,
  attributes = {},
  onChange,
  onBlur,
  onFocus
}: Props) => {
  return (
    <div className={[styles.textField, ...additionalClasses].join(' ')}>
      {label && <div className={formStyles.label}>{label}</div>}
      <div className={styles.inputContainer}>
        <input
          type={password ? 'password' : 'text'}
          className={cx({ input: true, withIcon: !!icon, reverseIconPosition, isInvalid })}
          value={value}
          placeholder={placeholder}
          maxLength={maxLength}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          {...attributes}
        />
        {icon && <span className={cx({ fieldIcon: true, reverseIconPosition })}>{icon}</span>}
      </div>
    </div>
  );
};

TextField.displayName = 'TextField';
export default TextField;
