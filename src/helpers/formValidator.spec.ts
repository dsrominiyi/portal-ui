import {
  validate,
  validateAll,
  validateForm,
  isFormValid,
  buildErrors,
  predefinedRules
} from './formValidator';
import debounce from './debounce';

jest.mock('./debounce');

const debouncedFunc = jest.fn();
(debounce as jest.Mock).mockReturnValue(debouncedFunc);

describe('formValidator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('validate', () => {
    it('returns success when an empty value is passed for a non-required field', () => {
      expect(
        validate(
          {
            fieldLabel: 'non-required field',
            required: false
          },
          ''
        )
      ).toMatchObject({
        isValid: true
      });
    });

    it('returns success when an empty array is passed for a non-required field', () => {
      expect(
        validate(
          {
            fieldLabel: 'non-required array',
            required: false
          },
          []
        )
      ).toMatchObject({
        isValid: true
      });
    });

    it('returns success when empty date field values are passed for non-required date', () => {
      expect(
        validate(
          {
            fieldLabel: 'non-required date',
            isDate: true,
            required: false
          },
          { dd: '', mm: '', yyyy: '' }
        )
      ).toMatchObject({
        isValid: true
      });
    });

    it('returns success for valid date fields', () => {
      expect(
        validate(
          {
            fieldLabel: 'required date',
            isDate: true
          },
          { dd: '30', mm: '12', yyyy: '1980' }
        )
      ).toMatchObject({
        isValid: true
      });
    });

    it('returns success for a valid date string', () => {
      expect(
        validate(
          {
            fieldLabel: 'required date string',
            isDate: true
          },
          '1980-12-30'
        )
      ).toMatchObject({
        isValid: true
      });
    });

    it('returns false for invalid date fields', () => {
      expect(
        validate(
          {
            fieldLabel: 'required date',
            isDate: true
          },
          { dd: '39', mm: '12', yyyy: '1980' }
        )
      ).toMatchObject({
        isValid: false
      });
    });

    it('returns false for an invalid date string', () => {
      expect(
        validate(
          {
            fieldLabel: 'required date string',
            isDate: true
          },
          '1980-12-39'
        )
      ).toMatchObject({
        isValid: false
      });
    });

    it('treats an undefined value as a blank string', () => {
      expect(
        validate(
          {
            fieldLabel: 'non-required field',
            required: false
          },
          undefined
        )
      ).toMatchObject({
        isValid: true
      });
    });

    it('returns success when minimum length requirement is met', () => {
      expect(
        validate(
          {
            fieldLabel: '3 character minimum',
            minLength: 3
          },
          'test string'
        )
      ).toMatchObject({
        isValid: true
      });
    });

    it('returns status false when minimum length requirement is not met', () => {
      expect(
        validate(
          {
            fieldLabel: '3 character minimum',
            minLength: 3
          },
          'te'
        )
      ).toMatchObject({
        isValid: false,
        message: `3 character minimum has a minimum length of 3 characters`
      });
    });

    it('returns success when maximum length requirement is met', () => {
      expect(
        validate(
          {
            fieldLabel: '8 character maximum',
            maxLength: 8
          },
          'test'
        )
      ).toMatchObject({
        isValid: true
      });
    });

    it('returns status false when maximum length requirement is not met', () => {
      expect(
        validate(
          {
            fieldLabel: '8 character maximum',
            maxLength: 8
          },
          'test string'
        )
      ).toMatchObject({
        isValid: false,
        message: `8 character maximum has a maximum length of 8 characters`
      });
    });

    it('returns status false when regex does not match', () => {
      expect(
        validate(
          {
            fieldLabel: 'basic regex',
            regex: /abc/
          },
          'def'
        )
      ).toMatchObject({
        isValid: false,
        message: 'basic regex does not match the required format'
      });
    });

    it('returns status true when mandatory field is supplied', () => {
      expect(
        validate(
          {
            fieldLabel: 'mandatory field',
            required: true
          },
          'test string'
        )
      ).toMatchObject({ isValid: true });
    });

    it('returns status false when mandatory field is empty', () => {
      expect(
        validate(
          {
            fieldLabel: 'mandatory field',
            required: true
          },
          ''
        )
      ).toMatchObject({
        isValid: false,
        message: `Please enter mandatory field`
      });
    });

    it('returns status false when the value matches an invalid value', () => {
      const invalidValue = 'Not allowed!';
      const rule = {
        fieldLabel: 'field with disallowed values',
        invalidValues: ['this', 'that', invalidValue]
      };

      expect(validate(rule, invalidValue)).toMatchObject({
        isValid: false,
        message: `${rule.fieldLabel} cannot be one of the following: ${rule.invalidValues.join(
          ', '
        )}`
      });
    });

    it('returns success when postcode type requirements are met', () => {
      expect(validate(predefinedRules.postcode, 'TE1 5ST')).toMatchObject({
        isValid: true
      });
    });

    it('returns status false when postcode type maximum length is exceeded', () => {
      expect(validate(predefinedRules.postcode, 'test string')).toMatchObject({
        isValid: false,
        message: 'You must enter a valid UK postcode'
      });
    });

    it('returns status false when postcode type minimum length is not met', () => {
      expect(validate(predefinedRules.postcode, 'test')).toMatchObject({
        isValid: false,
        message: 'You must enter a valid UK postcode'
      });
    });

    it('returns status false when postcode type minimum length is not met', () => {
      expect(validate(predefinedRules.postcode, 'tests')).toMatchObject({
        isValid: false,
        message: 'You must enter a valid UK postcode'
      });
    });
  });

  describe('validateAll', () => {
    it('returns status true for each rule when passed a set of values', () => {
      expect(
        validateAll(
          {
            testRule: {
              fieldLabel: 'testRule',
              minLength: 4
            },
            testRuleTwo: {
              fieldLabel: 'testRuleTwo',
              maxLength: 8
            }
          },
          {
            testRule: 'test string',
            testRuleTwo: 'test'
          }
        )
      ).toMatchObject({
        testRule: { isValid: true },
        testRuleTwo: { isValid: true }
      });
    });
  });

  describe('validateForm', () => {
    const rules = {
      field1: predefinedRules.emailAddress,
      field2: predefinedRules.phoneNumber
    };
    const data = {
      field1: 'test@test.com',
      field2: '07574927564'
    };
    const setValidationState = jest.fn();

    it('debounces the form validation with an initial delay', () => {
      validateForm(rules, data, setValidationState);

      expect(debounce).toHaveBeenCalledWith(expect.any(Function), expect.any(Number), false);
      expect(debouncedFunc).toHaveBeenCalled();
    });

    it('it validates the form data and calls setValidationState with the result', () => {
      validateForm(rules, data, setValidationState);
      const validationActions = (debounce as jest.Mock).mock.calls[0][0];
      const expectedValidationResult = {
        field1: { isValid: true },
        field2: { isValid: true }
      };
      validationActions();

      expect(setValidationState).toHaveBeenCalledWith(expectedValidationResult);
    });
  });

  describe('isFormValid', () => {
    const validFormResult = {
      field1: { isValid: true },
      field2: { isValid: true },
      field3: { isValid: true }
    };
    const invalidFormResult = {
      ...validFormResult,
      field3: { isValid: false }
    };

    it('returns false if an empty object is supplied', () => {
      const result = isFormValid({});

      expect(result).toBe(false);
    });

    it('returns true if all the fields are valid', () => {
      const result = isFormValid(validFormResult);

      expect(result).toBe(true);
    });

    it('returns false if any of the fields are invalid', () => {
      const result = isFormValid(invalidFormResult);

      expect(result).toBe(false);
    });
  });

  describe('buildErrors', () => {
    const validationState = {
      field1: { isValid: true, message: '1' },
      field2: { isValid: false, message: '2' },
      field3: { isValid: false, message: '3' }
    };

    it('returns showError as true for each invalid field if submissionAttempted is true', () => {
      expect(buildErrors(validationState, true)).toEqual({
        field1: { showError: false, message: validationState.field1.message },
        field2: { showError: true, message: validationState.field2.message },
        field3: { showError: true, message: validationState.field3.message }
      });
    });

    it('returns showError as false for all fields if submissionAttempted is false', () => {
      expect(buildErrors(validationState, false)).toEqual({
        field1: { showError: false, message: validationState.field1.message },
        field2: { showError: false, message: validationState.field2.message },
        field3: { showError: false, message: validationState.field3.message }
      });
    });
  });
});
