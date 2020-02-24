import React, { FunctionComponent, useState, useEffect } from 'react';

import ContactDetailFields, { getDetailValidationRule } from '../ContactDetailFields';
import ValidationErrorsNotification from '../../common/ValidationErrorsNotification';

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

type UseStateArray = [Contact, React.Dispatch<React.SetStateAction<Contact>>];

const validationRules: ValidationRules = {
  type: { fieldLabel: 'contact detail type', required: true }
};

export const ContactDetailForm: FunctionComponent<FormProps> = ({
  additionalClasses = [],
  initialValues,
  submissionAttempted: submissionAttemptedProp,
  onChange,
  onSubmit
}: FormProps) => {
  const [state, setState]: UseStateArray = useState(
    (initialValues as Contact) || {
      type: '' as ContactType,
      detail: ''
    }
  );
  const [validationState, setValidationState]: ValidationStateArray = useState(
    {} as BatchValidationResult
  );
  const [submissionAttempted, setSubmissionAttempted] = useState(false);

  const { type, detail } = state;
  const canSubmit = isFormValid(validationState);

  useEffect(() => {
    const allValidationRules = { ...validationRules, detail: getDetailValidationRule(type) };
    const formData = {
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
      test-id="contact-detail-form"
    >
      {hasAttemptedToSubmit && !canSubmit && <ValidationErrorsNotification />}
      <ContactDetailFields
        type={type}
        detail={detail}
        fieldErrors={{
          type: formErrors.type,
          detail: formErrors.detail
        }}
        onChange={values => setState({ ...state, ...values })}
      />
    </div>
  );
};

ContactDetailForm.displayName = 'ContactDetailForm';
export default ContactDetailForm;
