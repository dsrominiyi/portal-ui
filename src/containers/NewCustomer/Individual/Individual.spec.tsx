import React from 'react';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import { shallow, mount, ShallowWrapper } from 'enzyme';

import ConnectedNewIndividual, { NewIndividual, Props, State } from '.';

jest.mock('../../../helpers/domHelper');

const mockStore = createMockStore([]);

let container: ShallowWrapper<Props, State, NewIndividual>;
let customerDetails: ShallowWrapper;
const connectedContainer = mount(
  <Provider store={mockStore({})}>
    <ConnectedNewIndividual />
  </Provider>
);

const render = () => {
  container = shallow(<NewIndividual />);
};

const renderCustomerDetails = () => {
  customerDetails = shallow((container.find('InfoBox').props() as any).items[0].props.children[0]);
};

const getField = (fieldIndex: number, inputIndex = 0) => {
  return (customerDetails
    .find('QuestionBox')
    .at(fieldIndex)
    .props() as any).inputFields[inputIndex];
};

const getSubField = (subFieldIndex: number, returnBox?: boolean) => {
  const subQuestionBox = (customerDetails
    .find('SubQuestion')
    .at(subFieldIndex)
    .props() as any).items[0];

  return returnBox ? subQuestionBox : subQuestionBox.props.inputFields[0];
};

const dateFieldValues = { dd: '02', mm: '11', yyyy: '2000' };

describe('NewIndividual', () => {
  beforeEach(() => {
    render();
    renderCustomerDetails();
  });

  test('the default export is a connected component', () => {
    const mappedProps = connectedContainer.find('NewIndividual').props();

    expect(mappedProps).toEqual({});
  });

  test('NewIndividual matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  test('selecting a title option sets the data.title state value', () => {
    const title = 'Mr';
    customerDetails.find('SelectTitle').simulate('change', title);

    expect(container.state().data.name.title).toBe(title);
  });

  test('entering a first name updates the data.forename state value', () => {
    const values = { forename: 'John' };
    customerDetails.find('NameFields').simulate('change', values);

    expect(container.state().data.name.forename).toBe(values.forename);
  });

  test('entering a middle name updates the data.middleName state value', () => {
    const values = { middleName: 'Dave' };
    customerDetails.find('NameFields').simulate('change', values);

    expect(container.state().data.name.middleName).toBe(values.middleName);
  });

  test('entering a surname updates the data.surname state value', () => {
    const values = { surname: 'Smith' };
    customerDetails.find('NameFields').simulate('change', values);

    expect(container.state().data.name.surname).toBe(values.surname);
  });

  test('selecting a gender option sets the data.sex state value', () => {
    const genderMultiChoice = getField(0);

    container.instance().genderList.forEach(genderOption => {
      genderMultiChoice.props.onClick(genderOption);

      expect(container.state().data.sex).toBe(genderOption);
    });
  });

  test('changing the date of birth fields updates the data.dateOfBirth state value', () => {
    const dateOfBirthFields = getField(1);
    dateOfBirthFields.props.onChange(dateFieldValues);

    expect(container.state().data.dateOfBirth).toBe(dateFieldValues);
  });

  test('selecting a resident since birth option updates the data.residentSinceBirth state value', () => {
    const residentSinceBirthMultiChoice = getField(2);
    residentSinceBirthMultiChoice.props.onClick('Yes');

    expect(container.state().data.residentSinceBirth).toBe(true);

    residentSinceBirthMultiChoice.props.onClick('No');

    expect(container.state().data.residentSinceBirth).toBe(false);
  });

  test('setting resident since birth to no renders the residency date field', () => {
    let subQuestionBox = customerDetails.find('SubQuestion').at(0);

    expect((subQuestionBox.props() as any).visible).toBe(false);

    const residentSinceBirthMultiChoice = getField(2);
    residentSinceBirthMultiChoice.props.onClick('No');
    renderCustomerDetails();
    subQuestionBox = customerDetails.find('SubQuestion').at(0);
    const residencyDateBox = getSubField(0, true);

    expect((subQuestionBox.props() as any).visible).toBe(true);
    expect(residencyDateBox.props.text).toBe('Residency date');
  });

  test('changing the residency date fields updates the data.residencyDate state value', () => {
    const residentSinceBirthMultiChoice = getField(2);
    residentSinceBirthMultiChoice.props.onClick('No');
    renderCustomerDetails();
    const residencyDateFields = getSubField(0);

    residencyDateFields.props.onChange(dateFieldValues);

    expect(container.state().data.residencyDate).toBe(dateFieldValues);
  });

  test('selecting a marital status option updates the data.maritalStatus state value', () => {
    const value = 'Single';
    const maritalStatusDropdown = getField(3);
    maritalStatusDropdown.props.onChange(value);

    expect(container.state().data.maritalStatus).toBe(value);
  });

  test('selecting a homeowner option updates the data.homeowner state value', () => {
    const homeownerMultiChoice = getField(4);
    homeownerMultiChoice.props.onClick('Yes');

    expect(container.state().data.homeowner).toBe(true);

    homeownerMultiChoice.props.onClick('No');

    expect(container.state().data.homeowner).toBe(false);
  });

  test('updating the contact preferences form updates the data.contactPreferences state value', () => {
    const updatedPreferences = { test: 'data' };
    const contactPreferencesForm = (container.find('InfoBox').props() as any).items[0].props
      .children[2];
    contactPreferencesForm.props.onChange(updatedPreferences);

    expect(container.state().data.contactPreferences).toBe(updatedPreferences);
  });
});
