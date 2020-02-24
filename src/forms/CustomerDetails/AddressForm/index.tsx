import React, { ChangeEvent, FunctionComponent, useState, useEffect } from 'react';

import SubQuestion from '../../../components/SubQuestion';
import ValidationErrorsNotification from '../../common/ValidationErrorsNotification';

import {
  BatchValidationResult,
  isFormValid,
  predefinedRules,
  validateForm,
  ValidationRules,
  ValidationStateArray,
  buildErrors
} from '../../../helpers/formValidator';
import {
  individualAddressTypeOptions,
  CompanyAddressTypeOptions
} from '../../../helpers/optionLists';
import { triggerOnEnter } from '../../../helpers/domHelper';
import { buildInput } from '../../../helpers/formHelper';

import formStyles from '../../styles.scss';

interface FormConfig {
  customerType: CustomerType;
}

type UseStateArray = [Address, React.Dispatch<React.SetStateAction<Address>>];

export const emptyAddress: Address = {
  type: undefined,
  organisation: '',
  buildingName: '',
  subBuildingName: '',
  buildingNumber: '',
  thoroughfare: '',
  subThoroughfare: '',
  locality: '',
  town: '',
  county: '',
  postcode: ''
};

const validationRules: ValidationRules = {
  type: { fieldLabel: 'address type' },
  organisation: { fieldLabel: 'organisation', required: false, maxLength: 50 },
  buildingName: { fieldLabel: 'building name', required: true, maxLength: 50 },
  subBuildingName: { fieldLabel: 'subBuildingName', required: false },
  buildingNumber: { fieldLabel: 'building number', required: true, maxLength: 50 },
  thoroughfare: { fieldLabel: 'first line', required: true, maxLength: 50 },
  subThoroughfare: { fieldLabel: 'second line', required: false, maxLength: 50 },
  locality: { fieldLabel: 'locality', required: false, maxLength: 50 },
  town: { fieldLabel: 'town', required: true, maxLength: 50 },
  county: { fieldLabel: 'county', required: true, maxLength: 50 },
  postcode: { ...predefinedRules.postcode, required: true }
};

export const AddressForm: FunctionComponent<FormProps> = ({
  additionalClasses = [],
  initialValues,
  submissionAttempted: submissionAttemptedProp,
  config = {},
  onChange,
  onSubmit
}: FormProps) => {
  const [state, setState]: UseStateArray = useState((initialValues as Address) || emptyAddress);

  const [validationState, setValidationState]: ValidationStateArray = useState(
    {} as BatchValidationResult
  );
  const [submissionAttempted, setSubmissionAttempted] = useState(false);
  const [manualEntry, setManualEntry] = useState(false);

  const canSubmit = isFormValid(validationState);

  const getBuildingNameOrNumberRules = (validationAddress: Address) => {
    const buildingNameOrNumberRules = {
      buildingName: { ...validationRules.buildingName },
      buildingNumber: { ...validationRules.buildingNumber }
    };
    if (validationAddress.buildingNumber) {
      buildingNameOrNumberRules.buildingName.required = false;
      return buildingNameOrNumberRules;
    }
    if (validationAddress.buildingName) {
      buildingNameOrNumberRules.buildingNumber.required = false;
      return buildingNameOrNumberRules;
    }
    return buildingNameOrNumberRules;
  };

  useEffect(() => {
    const allValidationRules = { ...validationRules, ...getBuildingNameOrNumberRules(state) };

    validateForm(allValidationRules, { ...state }, setValidationState);
    onChange(state, canSubmit);
  }, [state]);

  useEffect(() => {
    onChange(state, canSubmit);
  }, [validationState]);

  const getTextOnChange = (fieldName: keyof Address) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      let { value } = event.target;
      if (fieldName === 'postcode') {
        value = value.toUpperCase();
      }
      setState({ ...state, [fieldName]: value });
    };
  };

  const toggleManualEntry = () => setManualEntry(!manualEntry);

  const submit = () => {
    setSubmissionAttempted(true);
    return canSubmit && onSubmit && onSubmit();
  };

  const { customerType } = config as FormConfig;
  const hasAttemptedToSubmit = submissionAttemptedProp || submissionAttempted;
  const formErrors = buildErrors(validationState, hasAttemptedToSubmit);

  return (
    <div
      className={[formStyles.formSection, additionalClasses].join(' ')}
      onKeyUp={triggerOnEnter(submit)}
      test-id="new-address-form"
    >
      {hasAttemptedToSubmit && !canSubmit && <ValidationErrorsNotification />}
      {buildInput(
        {
          type: InputType.Dropdown,
          label: 'Type',
          options:
            customerType === 'Individual'
              ? individualAddressTypeOptions
              : CompanyAddressTypeOptions,
          value: state.type,
          onChange: (option: AddressType) => {
            setState({ ...state, type: option });
          },
          attributes: { 'test-id': 'select-type' }
        },
        formErrors.type
      )}
      {buildInput(
        {
          type: InputType.Text,
          label: 'Building name/number',
          value: state.buildingNumber,
          onChange: getTextOnChange('buildingNumber'),
          attributes: { 'test-id': 'building-name-number' }
        },
        formErrors.buildingNumber
      )}
      {buildInput(
        {
          type: InputType.Lookup,
          label: 'Postcode',
          value: state.postcode,
          buttonLabel: 'Find Address',
          secondaryButtonLabel: 'Enter Manually',
          onChange: getTextOnChange('postcode'),
          secondaryAction: toggleManualEntry,
          attributes: { 'test-id': 'postcode-lookup' }
        },
        formErrors.postcode
      )}
      <SubQuestion
        visible={manualEntry}
        items={[
          buildInput(
            {
              type: InputType.Text,
              label: 'Organisation',
              value: state.organisation,
              onChange: getTextOnChange('organisation'),
              attributes: { 'test-id': 'organisation' }
            },
            formErrors.organisation
          ),
          buildInput(
            {
              type: InputType.Text,
              label: 'Building name',
              value: state.buildingName,
              onChange: getTextOnChange('buildingName'),
              attributes: { 'test-id': 'building-name' }
            },
            formErrors.buildingName
          ),
          buildInput(
            {
              type: InputType.Text,
              label: 'Building number',
              value: state.buildingNumber,
              onChange: getTextOnChange('buildingNumber'),
              attributes: { 'test-id': 'building-number' }
            },
            formErrors.buildingNumber
          ),
          buildInput(
            {
              type: InputType.Text,
              label: 'First Line',
              value: state.thoroughfare,
              onChange: getTextOnChange('thoroughfare'),
              attributes: { 'test-id': 'line-1' }
            },
            formErrors.thoroughfare
          ),
          buildInput(
            {
              type: InputType.Text,
              label: 'Second Line',
              value: state.subThoroughfare,
              onChange: getTextOnChange('subThoroughfare'),
              attributes: { 'test-id': 'line-2' }
            },
            formErrors.subThoroughfare
          ),
          buildInput(
            {
              type: InputType.Text,
              label: 'Town',
              value: state.town,
              onChange: getTextOnChange('town'),
              attributes: { 'test-id': 'town' }
            },
            formErrors.town
          ),
          buildInput(
            {
              type: InputType.Text,
              label: 'County',
              value: state.county,
              onChange: getTextOnChange('county'),
              attributes: { 'test-id': 'county' }
            },
            formErrors.county
          ),
          buildInput(
            {
              type: InputType.Text,
              label: 'Postcode',
              value: state.postcode,
              onChange: getTextOnChange('postcode'),
              attributes: { 'test-id': 'postcode' }
            },
            formErrors.postcode
          )
        ]}
      />
    </div>
  );
};

export default AddressForm;
