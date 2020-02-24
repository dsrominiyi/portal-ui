import React from 'react';
import { shallow, mount, ShallowWrapper, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';

import ContactDetailForm from '.';

import { isFormValid, buildErrors } from '../../../helpers/formValidator';

jest.mock('../../../helpers/formValidator');

let form: ShallowWrapper | ReactWrapper;
const onChange = jest.fn();
const onSubmit = jest.fn();
(isFormValid as jest.Mock).mockReturnValue(true);
(buildErrors as jest.Mock).mockReturnValue({ relationship: {}, title: {} });

const getTypeDropdown = () => {
  return (form
    .find('QuestionBox')
    .at(0)
    .props() as any).inputFields[0];
};

describe('ContactDetailForm', () => {
  describe('snapshots', () => {
    beforeEach(() => {
      form = shallow(<ContactDetailForm onChange={onChange} onSubmit={onSubmit} />);
    });

    test('ContactDetailForm matches snapshot', () => {
      expect(form).toMatchSnapshot();
    });

    test('ContactDetailForm with initial values matches snapshot', () => {
      (form as ShallowWrapper).setProps({
        initialValues: { type: ContactType.HomeNumber, detail: '08589392900' }
      });

      expect(form).toMatchSnapshot();
    });

    test('ContactDetailForm without form errors matches snapshot', () => {
      (buildErrors as jest.Mock).mockReturnValueOnce({});
      form = shallow(<ContactDetailForm onChange={onChange} onSubmit={onSubmit} />);

      expect(form).toMatchSnapshot();
    });
  });

  describe('functionality', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      form = mount(<ContactDetailForm onChange={onChange} onSubmit={onSubmit} />);
    });

    test('onSubmit is called when the Enter is pressed', () => {
      form.simulate('keyup', { key: 'Enter' });

      expect(onSubmit).toHaveBeenCalled();
    });

    test('onSubmit is not called when the Enter is pressed if the form is invalid', () => {
      (isFormValid as jest.Mock).mockReturnValueOnce(false);
      form.simulate('keyup', { key: 'Enter' });

      expect(onSubmit).not.toHaveBeenCalled();
    });

    test('ValidationErrorsNotification is rendered when the Enter is pressed but the form is invalid', () => {
      (isFormValid as jest.Mock).mockReturnValueOnce(false);
      (form as ReactWrapper).setProps({ submissionAttempted: true });
      form.simulate('keyup', { key: 'Enter' });

      expect(form.find('ValidationErrorsNotification').length).toBe(1);
    });

    test('onChange is called with the form state when any field is updated', () => {
      const type = ContactType.WorkNumber;
      const typeDropdown = getTypeDropdown();

      act(() => {
        typeDropdown.props.onChange(type);
      });

      expect(onChange).toHaveBeenCalledWith(
        {
          type: '' as ContactType,
          detail: ''
        },
        true
      );
    });
  });
});
