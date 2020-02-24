import React, { FunctionComponent, MouseEvent, ReactNode } from 'react';
import classnames from 'classnames/bind';

import statusClassMapper from '../../helpers/statusClassMapper';

import styles from './styles.scss';

interface Props {
  label: ReactNode;
  status?: Status;
  classNames?: string[];
  additionalClasses?: string[];
  isDisabled?: boolean;
  attributes?: { [attr: string]: string };
  onClick?(event: MouseEvent): void;
}

const cx = classnames.bind(styles);

export const Button: FunctionComponent<Props> = ({
  label,
  onClick,
  status,
  classNames,
  additionalClasses = [],
  isDisabled,
  attributes = {}
}: Props) => {
  const buttonClasses = classNames
    ? classNames.join(' ')
    : [styles.button, ...additionalClasses, cx({ ...statusClassMapper(status) })].join(' ');

  return (
    <button className={buttonClasses} onClick={onClick} disabled={isDisabled} {...attributes}>
      {label}
    </button>
  );
};

Button.displayName = 'Button';
export default Button;
