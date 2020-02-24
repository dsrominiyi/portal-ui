import React, { FunctionComponent, useState, useEffect } from 'react';

import SelectCompanyTypeStatus from '../SelectCompanyTypeStatus';
import AddContactDetailsField from '../AddItemsField/AddContactDetailsField';
import AddAdditionalContactsField from '../AddItemsField/AddAdditionalContactsField';
import AddAddressesField from '../AddItemsField/AddAddressesField';
import ValidationErrorsNotification from '../../common/ValidationErrorsNotification';

import {
  companyFormValidationRules as validationRules,
  buildCompanyFromFormData,
  buildFormDataFromCompany
} from '../../../helpers/customerHelper';
import {
  BatchValidationResult,
  ValidationStateArray,
  isFormValid,
  validateForm,
  buildErrors
} from '../../../helpers/formValidator';
import { buildInput } from '../../../helpers/formHelper';
import inputConfig from '../CompanyForm/inputConfig';
import { triggerOnEnter } from '../../../helpers/domHelper';

import formStyles from '../../styles.scss';

type UseStateArray = [NewCompanyData, React.Dispatch<React.SetStateAction<NewCompanyData>>];

export const SubsidiaryForm: FunctionComponent<FormProps> = ({
  additionalClasses = [],
  initialValues,
  submissionAttempted: submissionAttemptedProp,
  onChange,
  onSubmit
}: FormProps) => {
  const [state, setState]: UseStateArray = useState(
    (initialValues && buildFormDataFromCompany(initialValues as Company)) || {
      companyName: '',
      tradingName: '',
      typeStatus: undefined,
      businessClass: '',
      tradingSinceDate: { dd: '', mm: '', yyyy: '' },
      registeredCoNumber: '',
      parentCompany: false,
      parentCompanyName: '',
      contactDetails: [],
      additionalContacts: [],
      addresses: []
    }
  );
  const [validationState, setValidationState]: ValidationStateArray = useState(
    {} as BatchValidationResult
  );
  const [submissionAttempted, setSubmissionAttempted] = useState(false);

  const {
    companyName,
    tradingName,
    typeStatus,
    businessClass,
    tradingSinceDate,
    registeredCoNumber,
    contactDetails,
    additionalContacts,
    addresses
  } = state;
  const canSubmit = isFormValid(validationState);

  useEffect(() => {
    const formData = {
      companyName,
      tradingName,
      typeStatus,
      businessClass,
      tradingSinceDate,
      registeredCoNumber,
      contactDetails,
      addresses
    };
    validateForm(validationRules, formData, setValidationState);
    onChange(buildCompanyFromFormData(state), canSubmit);
  }, [state]);

  useEffect(() => {
    onChange(buildCompanyFromFormData(state), canSubmit);
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
      test-id="new-subsidiary-form"
    >
      {hasAttemptedToSubmit && !canSubmit && <ValidationErrorsNotification />}
      <h3>Company Details</h3>
      {buildInput(
        inputConfig.companyName(companyName, event => {
          setState({ ...state, companyName: event.target.value });
        }),
        formErrors.companyName
      )}
      {buildInput(
        inputConfig.tradingName(tradingName, event => {
          setState({ ...state, tradingName: event.target.value });
        }),
        formErrors.tradingName
      )}
      <SelectCompanyTypeStatus
        typeStatus={typeStatus}
        hasError={formErrors.typeStatus?.showError}
        onChange={value => setState({ ...state, typeStatus: value })}
      />
      {buildInput(
        inputConfig.businessClass(value => {
          setState({ ...state, businessClass: value as string });
        }),
        formErrors.businessClass
      )}
      {buildInput(
        inputConfig.tradingSinceDate(tradingSinceDate, values => {
          setState({ ...state, tradingSinceDate: values });
        }),
        formErrors.tradingSinceDate
      )}
      {buildInput(
        inputConfig.registeredCoNumber(registeredCoNumber, event => {
          setState({ ...state, registeredCoNumber: event.target.value });
        }),
        formErrors.registeredCoNumber
      )}
      <AddContactDetailsField
        contactDetails={contactDetails}
        hasError={formErrors.contactDetails?.showError}
        onChange={values => setState({ ...state, contactDetails: values })}
      />
      <AddAdditionalContactsField
        additionalContacts={additionalContacts}
        onChange={values => setState({ ...state, additionalContacts: values })}
      />
      <h3>Address Details</h3>
      <AddAddressesField
        customerType="Company"
        addresses={addresses}
        hasError={formErrors.addresses?.showError}
        onChange={values => setState({ ...state, addresses: values })}
      />
    </div>
  );
};

SubsidiaryForm.displayName = 'SubsidiaryForm';
export default SubsidiaryForm;
