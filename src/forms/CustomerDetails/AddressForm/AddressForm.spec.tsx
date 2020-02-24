import { mount, shallow } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';

import AddressForm, { emptyAddress } from './index';
import { isFormValid, validateForm, buildErrors } from '../../../helpers/formValidator';

jest.mock('../../../helpers/formValidator');

let form: any;
const onSubmit = jest.fn().mockReturnValue(true);
const onChange = jest.fn();
(isFormValid as jest.Mock).mockReturnValue(true);
(buildErrors as jest.Mock).mockReturnValue({
  organisation: {},
  buildingName: {},
  buildingNumber: {},
  thoroughfare: {},
  subThoroughfare: {},
  town: {},
  county: {},
  postcode: {}
});

const getField = (fieldIndex: number) => {
  return (form
    .find('QuestionBox')
    .at(fieldIndex)
    .props() as any).inputFields[0];
};

const getSubField = (fieldIndex: number) => {
  return (form
    .find('SubQuestion')
    .first()
    .props() as any).items[fieldIndex].props.inputFields[0];
};

const address = { ...emptyAddress, postcode: 'A12 3BC' };

describe('AddressForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    form = shallow(
      <AddressForm
        config={{ customerType: 'Individual' }}
        onChange={onChange}
        onSubmit={onSubmit}
      />
    );
  });

  describe('snapshots', () => {
    test('AddressForm for individual matches snapshot', () => {
      form.setProps({
        config: { customerType: 'Company' }
      });

      expect(form).toMatchSnapshot();
    });

    test('AddressForm for company matches snapshot', () => {
      expect(form).toMatchSnapshot();
    });

    test('AddressForm with initial values matches snapshot', () => {
      form.setProps({
        initialValues: address
      });

      expect(form).toMatchSnapshot();
    });

    test('SubsidiaryForm without form errors matches snapshot', () => {
      (buildErrors as jest.Mock).mockReturnValueOnce({});
      form = shallow(<AddressForm onChange={onChange} onSubmit={onSubmit} />);

      expect(form).toMatchSnapshot();
    });
  });

  describe('functionality', () => {
    const getMountedForm = () => {
      return mount(
        <AddressForm
          initialValues={address}
          onChange={onChange}
          onSubmit={onSubmit}
          key="address"
        />
      );
    };

    test('clicking the manual entry button reveals the manual entry form', () => {
      const postcodeLookup = getField(2);
      postcodeLookup.props.secondaryAction();
      form.update();
      const manualEntryForm = form.find('SubQuestion').first();
      expect(manualEntryForm.props().visible).toBe(true);
    });

    test('selecting a type updates the type state value', () => {
      act(() => {
        getField(0).props.onChange('residential');
      });
      form.update();

      expect(getField(0).props.selected).toBe('residential');
    });

    test('updating the town field updates the town state value', () => {
      const input = getSubField(5);
      act(() => {
        (input.props as any).onChange({ target: { value: 'anytown' } });
      });
      form.update();

      expect(getSubField(5).props.value).toBe('anytown');
    });

    test('updating the postcode field updates the postcode state value', () => {
      getField(2).props.onChange({ target: { value: 'TE1 5ST' } });
      form.update();

      expect(getField(2).props.value).toBe('TE1 5ST');
    });

    test('onSubmit is called when the Enter is pressed', () => {
      (isFormValid as jest.Mock).mockReturnValueOnce(true);
      form.simulate('keyup', { key: 'Enter' });

      expect(onSubmit).toHaveBeenCalled();
    });

    test('onSubmit is not called when the Enter is pressed but the form is invalid', () => {
      (isFormValid as jest.Mock).mockReturnValueOnce(false);
      form.simulate('keyup', { key: 'Enter' });

      expect(onSubmit).not.toHaveBeenCalled();
    });

    test('ValidationErrorsNotification is rendered when the Enter is pressed but the form is invalid', () => {
      (isFormValid as jest.Mock).mockReturnValueOnce(false);
      form.setProps({ submissionAttempted: true });
      form.simulate('keyup', { key: 'Enter' });

      expect(form.find('ValidationErrorsNotification').length).toBe(1);
    });

    test('entering a building name makes building number optional', () => {
      const mountedForm = getMountedForm();
      const buildingName = (mountedForm
        .find('SubQuestion')
        .first()
        .props() as any).items[1].props.inputFields[0];
      act(() => {
        buildingName.props.onChange({ target: { value: 'Any House' } });
      });
      mountedForm.update();
      mountedForm.simulate('keyup', { key: 'Enter' });

      expect(validateForm).toHaveBeenLastCalledWith(
        expect.objectContaining({
          buildingName: expect.objectContaining({ required: true }),
          buildingNumber: expect.objectContaining({ required: false })
        }),
        expect.anything(),
        expect.anything()
      );
    });

    test('entering a building number makes building name optional', () => {
      const mountedForm = getMountedForm();
      const buildingNumber = (mountedForm
        .find('SubQuestion')
        .first()
        .props() as any).items[2].props.inputFields[0];
      act(() => {
        buildingNumber.props.onChange({ target: { value: 'Any House' } });
      });
      mountedForm.update();
      mountedForm.simulate('keyup', { key: 'Enter' });

      expect(validateForm).toHaveBeenLastCalledWith(
        expect.objectContaining({
          buildingName: expect.objectContaining({ required: false }),
          buildingNumber: expect.objectContaining({ required: true })
        }),
        expect.anything(),
        expect.anything()
      );
    });

    test('onChange is called with the form state when a field is updated', () => {
      const postcode = 'SD1 4VB';

      act(() => {
        (getMountedForm()
          .find('Lookup')
          .at(0)
          .props() as any).onChange({ target: { value: postcode } });
      });

      expect(onChange).toHaveBeenCalledWith({ ...emptyAddress, postcode }, true);
    });

    test('postcode lookup should convert everything to uppercase', () => {
      getField(2).props.onChange({ target: { value: 'te1 5st' } });
      form.update();

      expect(getField(2).props.value).toBe('TE1 5ST');
    });
  });
});
