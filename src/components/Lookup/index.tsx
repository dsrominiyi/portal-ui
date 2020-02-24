import React, { FunctionComponent, ChangeEvent, MouseEvent } from 'react';

import Button from '../Button';
import TextField from '../TextField';

import styles from './styles.scss';

interface Props {
  value?: string;
  label?: string;
  buttonLabel?: string;
  secondaryButtonLabel?: string;
  isInvalid?: boolean;
  attributes?: { [attr: string]: string };
  onClick?(event: MouseEvent): void;
  onChange?(event: ChangeEvent<HTMLInputElement>): void;
  secondaryAction?(event: MouseEvent): void;
}

export const Lookup: FunctionComponent<Props> = ({
  value,
  label,
  buttonLabel,
  secondaryButtonLabel,
  isInvalid,
  attributes,
  onClick,
  onChange,
  secondaryAction
}: Props) => {
  const testId = attributes && attributes['test-id'];
  return (
    <div className={styles.lookup}>
      <TextField
        label={label}
        onChange={onChange}
        value={value}
        isInvalid={isInvalid}
        attributes={attributes}
      />
      <Button
        label={buttonLabel || 'Search'}
        onClick={onClick}
        status={Status.Success}
        additionalClasses={[styles.button]}
        attributes={{ 'test-id': testId ? `${testId}-primary-action` : '' }}
      />
      {secondaryButtonLabel && secondaryAction ? (
        <Button
          label={secondaryButtonLabel}
          onClick={secondaryAction}
          additionalClasses={[styles.button]}
          attributes={{ 'test-id': testId ? `${testId}-secondary-action` : '' }}
        />
      ) : (
        undefined
      )}
    </div>
  );
};

Lookup.displayName = 'Lookup';
export default Lookup;
