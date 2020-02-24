import React, { ReactNode } from 'react';
import { storiesOf } from '@storybook/react';

import UserIcon from 'uikit-icons/lib/User';
import PasswordIcon from 'uikit-icons/lib/Lock';

import TextField from '.';

const stories = storiesOf('TextField', module);

const render = (
  password?: boolean,
  label?: string,
  value?: string,
  icon?: ReactNode,
  placeholder?: string,
  isInvalid?: boolean
) => (props?: any) => (
  <TextField
    key={props && props.key}
    password={password}
    label={label}
    value={value}
    placeholder={placeholder}
    icon={icon}
    onChange={() => null}
    isInvalid={isInvalid}
  />
);

export const storyRenders = {
  emailField: render(false, 'Email Address', 'test@datamatters.co.uk', <UserIcon />),
  passwordField: render(true, 'Password', 'testpass', <PasswordIcon />),
  withPlaceholder: render(false, undefined, undefined, undefined, 'Placeholder text'),
  invalid: render(false, undefined, undefined, undefined, 'Placeholder text', true)
};

stories.add('Email field', storyRenders.emailField);
stories.add('Password', storyRenders.passwordField);
stories.add('With placeholder', storyRenders.withPlaceholder);
stories.add('Invalid', storyRenders.invalid);
