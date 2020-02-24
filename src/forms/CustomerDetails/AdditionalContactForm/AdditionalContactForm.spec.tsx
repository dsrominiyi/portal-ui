import React from 'react';
import { shallow, mount, ShallowWrapper, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';

import AdditionalContactForm from '.';

import { isFormValid, buildErrors } from '../../../helpers/formValidator';

jest.mock('../../../helpers/formValidator');

let form: ShallowWrapper | ReactWrapper;
const onChange = jest.fn();
const onSubmit = jest.fn();
(isFormValid as jest.Mock).mockReturnValue(true);
(buildErrors as jest.Mock).mockReturnValue({ relationship: {}, title: {} });

const getRelationshipDropdown = () => {
  return (form
    .find('QuestionBox')
    .at(0)
    .props() as any).inputFields[0];
};

describe('AdditionalContactForm', () => {
  describe('snapshots', () => {
    beforeEach(() => {
      form = shallow(<AdditionalContactForm onChange={onChange} onSubmit={onSubmit} />);
    });

    test('AdditionalContactForm matches snapshot', () => {
      expect(form).toMatchSnapshot();
    });

    test('AdditionalContactForm with initial values matches snapshot', () => {
      (form as ShallowWrapper).setProps({
        initialValues: {
          name: { title: 'Mr', forename: 'Robert', middleName: 'Dave', surname: 'Smith' },
          contactDetails: [{ type: ContactType.HomeNumber, detail: '08589392900' }],
          relationship: AdditionalContactRelationship.Sibling
        }
      });

      expect(form).toMatchSnapshot();
    });

    test('AdditionalContactForm without form errors matches snapshot', () => {
      (buildErrors as jest.Mock).mockReturnValueOnce({});
      form = shallow(<AdditionalContactForm onChange={onChange} onSubmit={onSubmit} />);

      expect(form).toMatchSnapshot();
    });
  });

  describe('functionality', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      form = mount(<AdditionalContactForm onChange={onChange} onSubmit={onSubmit} />);
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
      const relationship = AdditionalContactRelationship.Spouse;
      const relationshipDropdown = getRelationshipDropdown();

      act(() => {
        relationshipDropdown.props.onChange(relationship);
      });

      expect(onChange).toHaveBeenCalledWith(
        {
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
          relationship
        },
        true
      );

      form.update();
      const title = 'Mr';

      act(() => {
        (form.find('SelectTitle').props() as any).onChange(title);
      });

      expect(onChange).toHaveBeenCalledWith(
        {
          name: {
            title,
            forename: '',
            surname: ''
          },
          contactDetails: [
            {
              type: '' as ContactType,
              detail: ''
            }
          ],
          relationship
        },
        true
      );

      form.update();
      const forename = 'Jim';
      const middleName = 'Jack';
      const surname = 'Jones';
      const nameFields = { forename, middleName, surname };

      act(() => {
        (form.find('NameFields').props() as any).onChange(nameFields);
      });

      expect(onChange).toHaveBeenCalledWith(
        {
          name: {
            title,
            forename,
            middleName,
            surname
          },
          contactDetails: [
            {
              type: '' as ContactType,
              detail: ''
            }
          ],
          relationship
        },
        true
      );

      form.update();
      const type = ContactType.HomeNumber;
      const detail = '09483424555';
      const contactDetail = { type, detail };

      act(() => {
        (form.find('ContactDetailFields').props() as any).onChange(contactDetail);
      });

      expect(onChange).toHaveBeenCalledWith(
        {
          name: {
            title,
            forename,
            middleName,
            surname
          },
          contactDetails: [contactDetail],
          relationship
        },
        true
      );
    });
  });
});
