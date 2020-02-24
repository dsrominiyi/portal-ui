import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import ContactDetailFields, { Props, getDetailValidationRule } from '.';

import { predefinedRules } from '../../../helpers/formValidator';

let fields: ShallowWrapper<Props>;
let typeField: any;
let detailField: any;

const type = ContactType.MobileNumber;
const detail = '07040208066';

const onChange = jest.fn();
const fieldErrors = {
  type: { showError: true, message: 'error!' },
  detail: { showError: true, message: 'error!' }
};

const update = () => {
  [typeField, detailField] = (fields.props() as any).children;
};

describe('ContactDetailFields', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fields = shallow(<ContactDetailFields detail="" onChange={onChange} />);
    update();
  });

  test('ContactDetailFields matches snapshot', () => {
    expect(fields).toMatchSnapshot();
  });

  test('ContactDetailFields with field errors matches snapshot', () => {
    fields.setProps({ fieldErrors });

    expect(fields).toMatchSnapshot();
  });

  test('selecting a type calls onChange with the updated value', () => {
    typeField.props.inputFields[0].props.onChange(type);

    expect(onChange).toHaveBeenCalledWith({ type, detail: '' });
  });

  test('entering the contact detail calls onChange with the updated value', () => {
    fields.setProps({ type });
    update();
    detailField.props.inputFields[0].props.onChange({ target: { value: detail } });

    expect(onChange).toHaveBeenCalledWith({ type, detail });
  });

  describe('getDetailValidationRule', () => {
    it('returns the phoneNumber validation rule for any number ContactType', () => {
      [ContactType.HomeNumber, ContactType.MobileNumber, ContactType.WorkNumber].forEach(
        numberType => {
          const rule = getDetailValidationRule(numberType);

          expect(rule).toEqual(predefinedRules.phoneNumber);
        }
      );
    });

    it('returns the emailAddress validation rule for any email ContactType', () => {
      [ContactType.PersonalEmail, ContactType.WorkEmail].forEach(emailType => {
        const rule = getDetailValidationRule(emailType);

        expect(rule).toEqual(predefinedRules.emailAddress);
      });
    });

    it('returns a default rule for any other type', () => {
      const rule = getDetailValidationRule('nonStandardType' as ContactType);

      expect(rule).toEqual({ fieldLabel: 'contact detail', required: true });
    });
  });
});
