import React, { FunctionComponent, Fragment } from 'react';

import QuestionBox from '../../../components/QuestionBox';
import TextField from '../../../components/TextField';

import { predefinedRules, ValidationError } from '../../../helpers/formValidator';

import formStyles from '../../styles.scss';

interface FieldValues {
  forename: string;
  middleName: string;
  surname: string;
}

interface FieldErrors {
  forename: ValidationError;
  middleName: ValidationError;
  surname: ValidationError;
}

export interface Props extends FieldValues {
  fieldErrors?: FieldErrors;
  onChange(values: FieldValues): void;
}

export const validationRules = {
  forename: { ...predefinedRules.individualName, fieldLabel: 'first name', required: true },
  middleName: { ...predefinedRules.individualName, fieldLabel: 'middle name' },
  surname: { ...predefinedRules.individualName, fieldLabel: 'surname', required: true }
};

export const NameFields: FunctionComponent<Props> = ({
  forename,
  middleName,
  surname,
  fieldErrors = {} as FieldErrors,
  onChange
}: Props) => (
  <Fragment>
    <QuestionBox
      hasError={fieldErrors.forename?.showError}
      errorText={fieldErrors.forename?.message}
      inputFields={[
        <TextField
          key="0"
          label="First name"
          value={forename}
          additionalClasses={[formStyles.formTextField]}
          isInvalid={fieldErrors.forename?.showError}
          onChange={event => onChange({ forename: event.target.value, middleName, surname })}
          attributes={{ 'test-id': 'first-name' }}
        />
      ]}
    />
    <QuestionBox
      hasError={fieldErrors.middleName?.showError}
      errorText={fieldErrors.middleName?.message}
      inputFields={[
        <TextField
          key="0"
          label="Middle name (optional)"
          value={middleName}
          additionalClasses={[formStyles.formTextField]}
          isInvalid={fieldErrors.middleName?.showError}
          onChange={event => onChange({ forename, middleName: event.target.value, surname })}
          attributes={{ 'test-id': 'middle-name' }}
        />
      ]}
    />
    <QuestionBox
      hasError={fieldErrors.surname?.showError}
      errorText={fieldErrors.surname?.message}
      inputFields={[
        <TextField
          key="0"
          label="Surname"
          value={surname}
          additionalClasses={[formStyles.formTextField]}
          isInvalid={fieldErrors.surname?.showError}
          onChange={event => onChange({ forename, middleName, surname: event.target.value })}
          attributes={{ 'test-id': 'surname' }}
        />
      ]}
    />
  </Fragment>
);

NameFields.displayName = 'NameFields';
export default NameFields;
