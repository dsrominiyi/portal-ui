import React, { FunctionComponent, Fragment } from 'react';

import QuestionBox from '../../../components/QuestionBox';
import Dropdown from '../../../components/Dropdown';
import TextField from '../../../components/TextField';

import { contactTypeOptions } from '../../../helpers/optionLists';
import { predefinedRules, ValidationError } from '../../../helpers/formValidator';

import formStyles from '../../styles.scss';

interface FieldErrors {
  type: ValidationError;
  detail: ValidationError;
}

export interface Props {
  type?: ContactType;
  detail: string;
  fieldErrors?: FieldErrors;
  onChange(values: Contact): void;
}

export const getDetailValidationRule = (type: ContactType) => {
  if ([ContactType.HomeNumber, ContactType.MobileNumber, ContactType.WorkNumber].includes(type)) {
    return predefinedRules.phoneNumber;
  }
  if ([ContactType.PersonalEmail, ContactType.WorkEmail].includes(type)) {
    return predefinedRules.emailAddress;
  }
  return { fieldLabel: 'contact detail', required: true };
};

export const ContactDetailFields: FunctionComponent<Props> = ({
  type = '' as ContactType,
  detail,
  fieldErrors = {} as FieldErrors,
  onChange
}: Props) => (
  <Fragment>
    <QuestionBox
      hasError={fieldErrors.type?.showError}
      errorText="Please confirm contact method"
      inputFields={[
        <Dropdown
          key="0"
          label="Contact method"
          options={contactTypeOptions}
          selected={type}
          isInvalid={fieldErrors.type?.showError}
          onChange={value => onChange({ type: value as ContactType, detail })}
          attributes={{ 'test-id': 'select-contact-method' }}
        />
      ]}
    />
    <QuestionBox
      hasError={fieldErrors.detail?.showError}
      errorText={fieldErrors.detail?.message}
      inputFields={[
        <TextField
          key="0"
          label="Contact"
          value={detail}
          additionalClasses={[formStyles.formTextField]}
          isInvalid={fieldErrors.detail?.showError}
          onChange={event => onChange({ type, detail: event.target.value })}
          attributes={{ 'test-id': 'contact-detail' }}
        />
      ]}
    />
  </Fragment>
);

ContactDetailFields.displayName = 'ContactDetailFields';
export default ContactDetailFields;
