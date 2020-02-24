import React, { FunctionComponent, MouseEvent } from 'react';
import classNames from 'classnames/bind';
import Button from '../index';
import styles from './styles.scss';

interface Props {
  label: string;
  isActive?: boolean;
  isDisabled?: boolean;
  attributes?: { [attr: string]: string };
  onClick(event: MouseEvent): void;
}

const cx = classNames.bind(styles);

export const QuestionButton: FunctionComponent<Props> = ({
  label,
  isActive,
  isDisabled,
  attributes,
  onClick
}: Props) => (
  <Button
    label={label}
    classNames={[cx({ questionButton: true, active: isActive })]}
    onClick={onClick}
    isDisabled={isDisabled}
    attributes={attributes}
  />
);

QuestionButton.displayName = 'QuestionButton';
export default QuestionButton;
