import React, { FunctionComponent, useState, useEffect } from 'react';

import QuestionBox from '../../../components/QuestionBox';
import Dropdown from '../../../components/Dropdown';

import SelectTitle from '../SelectTitle';
import NameFields, { validationRules as nameValidationRules } from '../NameFields';
import ContactDetailFields, { getDetailValidationRule } from '../ContactDetailFields';
import ValidationErrorsNotification from '../../common/ValidationErrorsNotification';

import { additionalContactRelationshipOptions } from '../../../helpers/optionLists';
import { triggerOnEnter } from '../../../helpers/domHelper';
import {
  BatchValidationResult,
  ValidationStateArray,
  ValidationRules,
  isFormValid,
  validateForm,
  buildErrors
} from '../../../helpers/formValidator';

import formStyles from '../../styles.scss';

type UseStateArray = [AdditionalContact, React.Dispatch<React.SetStateAction<AdditionalContact>>];

const validationRules: ValidationRules = {
  ...nameValidationRules,
  title: {
    fieldLabel: 'title',
    required: true,
    invalidValues: ['Other']
  },
  relationship: {
    fieldLabel: 'relationship',
    required: true,
    errorMessage: 'Please confirm relationship'
  },
  type: { fieldLabel: 'contact detail type', required: true }
};

export const AdditionalContactForm: FunctionComponent<FormProps> = ({
  additionalClasses = [],
  initialValues,
  submissionAttempted: submissionAttemptedProp,
  onChange,
  onSubmit
}: FormProps) => {
  const [state, setState]: UseStateArray = useState(
    (initialValues as AdditionalContact) || {
      name: {
        title: '',
        forename: '',
        surname: ''
      },
      contactDetails: [
        {
          type: '' as ContactType,
          detail: ''
        }
      ],
      relationship: '' as AdditionalContactRelationship
    }
  );
  const [validationState, setValidationState]: ValidationStateArray = useState(
    {} as BatchValidationResult
  );
  const [submissionAttempted, setSubmissionAttempted] = useState(false);

  const { name, contactDetails, relationship } = state;
  const { title, forename, middleName, surname } = name;
  const { type, detail } = contactDetails[0];
  const canSubmit = isFormValid(validationState);

  useEffect(() => {
    const allValidationRules = { ...validationRules, detail: getDetailValidationRule(type) };
    const formData = {
      ...name,
      title,
      relationship,
      type,
      detail
    };
    validateForm(allValidationRules, formData, setValidationState);
    onChange(state, canSubmit);
  }, [state]);

  useEffect(() => {
    onChange(state, canSubmit);
  }, [validationState]);

  const submit = () => {
    setSubmissionAttempted(true);
    return canSubmit && onSubmit && onSubmit();
  };

  const hasAttemptedToSubmit = submissionAttemptedProp || submissionAttempted;
  const formErrors = buildErrors(validationState, hasAttemptedToSubmit);

  return (
    <div
      className={[formStyles.formSection, additionalClasses].join(' ')}
      onKeyUp={triggerOnEnter(submit)}
      test-id="additional-contact-form"
    >
      {hasAttemptedToSubmit && !canSubmit && <ValidationErrorsNotification />}
      <QuestionBox
        hasError={formErrors.relationship?.showError}
        errorText={formErrors.relationship?.message}
        inputFields={[
          <Dropdown
            key="0"
            label="Relationship"
            options={additionalContactRelationshipOptions}
            selected={relationship}
            isInvalid={formErrors.relationship?.showError}
            onChange={value => {
              setState({ ...state, relationship: value as AdditionalContactRelationship });
            }}
            attributes={{ 'test-id': 'select-relationship' }}
          />
        ]}
      />
      <SelectTitle
        title={title}
        hasError={formErrors.title?.showError}
        onChange={value => setState({ ...state, name: { ...name, title: value } })}
      />
      <NameFields
        forename={forename}
        middleName={middleName || ''}
        surname={surname}
        fieldErrors={{
          forename: formErrors.forename,
          middleName: formErrors.middleName,
          surname: formErrors.surname
        }}
        onChange={values => setState({ ...state, name: { ...values, title } })}
      />
      <ContactDetailFields
        type={type}
        detail={detail}
        fieldErrors={{
          type: formErrors.type,
          detail: formErrors.detail
        }}
        onChange={values => setState({ ...state, contactDetails: [values] })}
      />
    </div>
  );
};

AdditionalContactForm.displayName = 'AdditionalContactForm';
export default AdditionalContactForm;
