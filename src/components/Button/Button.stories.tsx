import React from 'react';
import { storiesOf } from '@storybook/react';

import Button from '.';
import styles from '../../containers/Login/styles.scss';
import buttonStyles from './styles.scss';

const stories = storiesOf('Button', module);

const render = (
  label: string,
  status?: Status,
  classNames?: string[],
  additionalClasses?: string[],
  isDisabled?: boolean
) => () => (
  <Button
    label={label}
    status={status}
    classNames={classNames}
    additionalClasses={additionalClasses}
    onClick={() => alert('You clicked!')}
    isDisabled={isDisabled}
  />
);

export const storyRenders = {
  default: render('TEST'),
  extraClass: render('TEST', undefined, undefined, [styles.loginButton]),
  customStyling: render('TEST', undefined, ['styles.customButton']),
  primary: render('TEST', undefined, undefined, [buttonStyles.primary]),
  secondary: render('TEST', undefined, undefined, [buttonStyles.secondary]),
  success: render('TEST', undefined, undefined, [buttonStyles.success]),
  warning: render('TEST', undefined, undefined, [buttonStyles.warning]),
  danger: render('TEST', undefined, undefined, [buttonStyles.danger]),
  disabled: render('TEST', undefined, undefined, undefined, true)
};

stories.add('Default', storyRenders.default);
stories.add('Additional class', storyRenders.extraClass);
stories.add('Custom styling', storyRenders.customStyling);
stories.add('Primary button', storyRenders.primary);
stories.add('Secondary button', storyRenders.secondary);
stories.add('Success button', storyRenders.success);
stories.add('Warning button', storyRenders.warning);
stories.add('Danger button', storyRenders.danger);
stories.add('Disabled', storyRenders.disabled);
