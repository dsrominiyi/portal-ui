import React, { FunctionComponent, MouseEvent, ReactNode } from 'react';
import Button from '../index';

import styles from './styles.scss';

interface Props {
  label: ReactNode;
  onClick(event: MouseEvent): void;
}

export const CircularButton: FunctionComponent<Props> = ({ label, onClick }: Props) => (
  <Button label={label} classNames={[styles.circularButton]} onClick={onClick} />
);

CircularButton.displayName = 'CircularButton';
export default CircularButton;
