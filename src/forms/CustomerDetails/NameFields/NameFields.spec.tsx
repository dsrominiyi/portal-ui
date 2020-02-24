import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import NameFields, { Props } from '.';

let fields: ShallowWrapper<Props>;
let forenameField: any;
let middleNameField: any;
let surnameField: any;

const forename = 'John';
const middleName = 'Dave';
const surname = 'Smith';

const onChange = jest.fn();
const fieldErrors = {
  forename: { showError: true, message: 'error!' },
  middleName: { showError: true, message: 'error!' },
  surname: { showError: true, message: 'error!' }
};

const update = () => {
  [forenameField, middleNameField, surnameField] = (fields.props() as any).children;
};

describe('NameFields', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fields = shallow(<NameFields forename="" middleName="" surname="" onChange={onChange} />);
    update();
  });

  test('NameFields matches snapshot', () => {
    expect(fields).toMatchSnapshot();
  });

  test('NameFields with field errors matches snapshot', () => {
    fields.setProps({ fieldErrors });

    expect(fields).toMatchSnapshot();
  });

  test('updating the forename field calls onChange with the updated value', () => {
    forenameField.props.inputFields[0].props.onChange({ target: { value: forename } });

    expect(onChange).toHaveBeenCalledWith({ forename, middleName: '', surname: '' });
  });

  test('updating the middleName field calls onChange with the updated value', () => {
    fields.setProps({ forename });
    update();
    middleNameField.props.inputFields[0].props.onChange({ target: { value: middleName } });

    expect(onChange).toHaveBeenCalledWith({ forename, middleName, surname: '' });
  });

  test('updating the surname field calls onChange with the updated value', () => {
    fields.setProps({ forename, middleName });
    update();
    surnameField.props.inputFields[0].props.onChange({ target: { value: surname } });

    expect(onChange).toHaveBeenCalledWith({ forename, middleName, surname });
  });
});
