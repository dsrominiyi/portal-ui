import React, { ReactNode } from 'react';

import QuestionBox from '../components/QuestionBox';
import TextField, { Props as TextFieldProps } from '../components/TextField';
import AbiSearch, { Props as AbiSearchProps } from '../components/AbiSearch';
import Dropdown, { DropdownOption, Props as DropdownProps } from '../components/Dropdown';
import MultiChoice, { Props as MultiChoiceProps } from '../components/MultiChoice';
import DateFields, { Props as DateFieldsProps } from '../forms/common/DateFields';
import Lookup from '../components/Lookup';

import { ValidationError } from './formValidator';

import formStyles from '../forms/styles.scss';

interface InputConfig {
  type: InputType;
  label: string;
  buttonLabel?: string;
  secondaryButtonLabel?: string;
  value?: FieldValue;
  codeListId?: string;
  options?: DropdownOption[] | string[];
  attributes?: { [attr: string]: string };
  onChange?:
    | TextFieldProps['onChange']
    | AbiSearchProps['onChange']
    | DropdownProps['onChange']
    | DateFieldsProps['onChange']
    | MultiChoiceProps['onClick'];
  secondaryAction?: () => void;
}

export const buildInput = (config: InputConfig, fieldError?: ValidationError) => {
  let input: ReactNode;

  switch (config.type) {
    case InputType.Text:
      input = (
        <TextField
          key="0"
          additionalClasses={[formStyles.formTextField]}
          label={config.label}
          value={config.value as string}
          isInvalid={fieldError?.showError}
          onChange={config.onChange as TextFieldProps['onChange']}
          attributes={config.attributes}
        />
      );
      break;
    case InputType.Lookup:
      input = (
        <Lookup
          key="0"
          label={config.label}
          buttonLabel={config.buttonLabel}
          secondaryButtonLabel={config.secondaryButtonLabel}
          value={config.value as string}
          isInvalid={fieldError?.showError}
          onChange={config.onChange as TextFieldProps['onChange']}
          secondaryAction={config.secondaryAction}
          attributes={config.attributes}
        />
      );
      break;
    case InputType.AbiSearch:
      input = (
        <AbiSearch
          key="0"
          label={config.label}
          codeListId={config.codeListId || ''}
          onChange={config.onChange as AbiSearchProps['onChange']}
          attributes={config.attributes}
        />
      );
      break;
    case InputType.Dropdown:
      input = (
        <Dropdown
          key="0"
          label={config.label}
          options={config.options!}
          selected={config.value as string}
          isInvalid={fieldError?.showError}
          onChange={config.onChange as DropdownProps['onChange']}
          attributes={config.attributes}
        />
      );
      break;
    case InputType.DateFields:
      input = (
        <DateFields
          key="0"
          values={config.value as DateFieldValues}
          onChange={config.onChange as DateFieldsProps['onChange']}
          testId={config.attributes && config.attributes['test-id']}
        />
      );
      break;
    case InputType.MultiChoice:
      input = (
        <MultiChoice
          key="0"
          options={config.options as string[]}
          selectedOption={config.value as string}
          onClick={config.onChange as MultiChoiceProps['onClick']}
          attributes={config.attributes}
        />
      );
      break;
  }

  return (
    <QuestionBox
      key={config.label}
      text={[InputType.DateFields, InputType.MultiChoice].includes(config.type) ? config.label : ''}
      hasError={fieldError?.showError}
      errorText={fieldError?.message}
      inputFields={[input]}
    />
  );
};
