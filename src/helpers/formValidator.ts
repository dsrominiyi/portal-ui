import { utc as moment } from 'moment';

import debounce from './debounce';
import { dateFieldValuesToDateString } from './utilFuncs';

/**
 * The formValidator helper functions supports a few different types of validation, these are
 * 'required', 'minLength', 'maxLength' and 'regex', where supplied values are simply used to
 * validate, additionally `predefinedRules` are made available, being made up of a range of rule
 * parts, these can then be imported for use in a form, and adjusted as individual needs require.
 */

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export interface ValidationError {
  showError: boolean;
  message?: string;
}

export interface FormData {
  [formFieldKey: string]: FieldValue;
}

export enum RuleType {
  postcode = 'postcode'
}

export interface ValidationRule {
  fieldLabel: string;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  regex?: string | RegExp;
  isDate?: boolean;
  invalidValues?: string[];
  errorMessage?: string;
}

export interface ValidationRules {
  [formFieldKey: string]: ValidationRule;
}

export interface BatchValidationResult {
  [formFieldKey: string]: ValidationResult;
}

export interface FormErrors {
  [formFieldKey: string]: ValidationError;
}

export interface ValidationData {
  [formFieldKey: string]: ValidationResult;
}

export type ValidationStateArray = [
  BatchValidationResult,
  React.Dispatch<React.SetStateAction<BatchValidationResult>>
];

const isDateFieldValues = (value: FieldValue): value is DateFieldValues => {
  const objKeys = typeof value === 'object' && Object.keys(value as DateFieldValues);
  return objKeys && objKeys.includes('dd') && objKeys.includes('mm') && objKeys.includes('yyyy');
};

export const predefinedRules: ValidationRules = {
  postcode: {
    fieldLabel: 'postcode',
    minLength: 5,
    maxLength: 8,
    regex: /^[A-Z]{1,2}[0-9]{1,2}[A-Z]?(\s*[0-9][A-Z]{1,2})?$/,
    errorMessage: 'You must enter a valid UK postcode'
  },
  emailAddress: {
    fieldLabel: 'email address',
    maxLength: 254,
    regex: /^[^@]+@[^.]+\..+$/,
    errorMessage: 'You must enter a valid email address',
    required: true
  },
  phoneNumber: {
    fieldLabel: 'phone number',
    minLength: 7,
    maxLength: 50,
    regex: /^\+?[\d\s]+$/,
    errorMessage: 'You must enter a valid phone number',
    required: true
  },
  individualName: {
    fieldLabel: 'name',
    regex: /^[a-zA-Z-]+$/,
    minLength: 2,
    maxLength: 50
  },
  entityName: {
    fieldLabel: 'name',
    regex: /^[\w\s-]+$/,
    minLength: 2,
    maxLength: 50
  },
  registeredCoNumber: {
    fieldLabel: 'registration number',
    regex: /^([a-zA-Z]{2}[0-9]{6}|[0-9]{8})$/,
    errorMessage: 'You must enter a valid Companies House CRN',
    required: true
  }
};

export const validate = (rule: ValidationRule, value: FieldValue = ''): ValidationResult => {
  const {
    minLength,
    maxLength,
    required,
    regex,
    isDate,
    invalidValues,
    fieldLabel,
    errorMessage
  } = rule;

  const isBoolean = typeof value === 'boolean';
  const isArray = Array.isArray(value);
  const isEmptyArray = isArray && !(value as unknown[]).length;
  const nonRequiredAndEmpty = (!required && !value) || (!required && isEmptyArray);
  const requiredAndEmpty = (required && !value) || (required && isEmptyArray);

  if (isBoolean || nonRequiredAndEmpty) {
    return { isValid: true };
  }
  if (requiredAndEmpty) {
    return {
      isValid: false,
      message: errorMessage || `Please enter ${fieldLabel}`
    };
  }

  if (isDate) {
    const dateString = isDateFieldValues(value)
      ? dateFieldValuesToDateString(value)
      : (value as string);

    return (!dateString && !required) || moment(dateString, 'YYYY-MM-DD').isValid()
      ? { isValid: true }
      : {
          isValid: false,
          message: errorMessage || `${fieldLabel} should be a valid date`
        };
  }

  const stringValue = value as string;

  if (invalidValues && invalidValues.includes(stringValue)) {
    return {
      isValid: false,
      message:
        errorMessage || `${fieldLabel} cannot be one of the following: ${invalidValues.join(', ')}`
    };
  }
  if (minLength && minLength > stringValue.length) {
    return {
      isValid: false,
      message: errorMessage || `${fieldLabel} has a minimum length of ${minLength} characters`
    };
  }
  if (maxLength && maxLength < stringValue.length) {
    return {
      isValid: false,
      message: errorMessage || `${fieldLabel} has a maximum length of ${maxLength} characters`
    };
  }
  if (regex && !RegExp(regex).test(stringValue)) {
    return {
      isValid: false,
      message: errorMessage || `${fieldLabel} does not match the required format`
    };
  }

  return { isValid: true };
};

export const validateAll = (rules: ValidationRules, data: FormData): BatchValidationResult => {
  return Object.entries(data).reduce(
    (validationData, [formFieldKey, value]) => ({
      ...validationData,
      [formFieldKey]: validate(rules[formFieldKey], value)
    }),
    {}
  );
};

export const validateForm = (
  rules: ValidationRules,
  data: FormData,
  setValidationState: React.Dispatch<React.SetStateAction<BatchValidationResult>>
) => {
  const validationActions = () => {
    const validationResult = validateAll(rules, data);
    setValidationState(validationResult);
  };

  debounce(validationActions, 250, false)();
};

export const isFormValid = (validatedFields: BatchValidationResult) => {
  if (Object.keys(validatedFields).length === 0) {
    return false;
  }
  let allFieldsValid = true;

  for (const validatedField of Object.values(validatedFields)) {
    if (!validatedField.isValid) {
      allFieldsValid = false;
      break;
    }
  }

  return allFieldsValid;
};

export const buildErrors = (
  validationState: BatchValidationResult,
  submissionAttempted: boolean
): FormErrors => {
  return Object.entries(validationState).reduce(
    (errors, [formFieldKey, result]) => ({
      ...errors,
      [formFieldKey]: {
        showError: submissionAttempted && !result.isValid,
        message: result.message
      }
    }),
    {}
  );
};
