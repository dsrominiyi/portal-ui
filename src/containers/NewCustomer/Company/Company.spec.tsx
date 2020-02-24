import React from 'react';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import { shallow, mount, ShallowWrapper } from 'enzyme';

import ConnectedNewCompany, { NewCompany, Props, State } from '.';

const mockStore = createMockStore([]);

let container: ShallowWrapper<Props, State, NewCompany>;
let customerDetails: ShallowWrapper;
const connectedContainer = mount(
  <Provider
    store={mockStore({
      search: {
        hitResults: [],
        suggestResults: []
      }
    })}
  >
    <ConnectedNewCompany />
  </Provider>
);

const render = () => {
  container = shallow(<NewCompany />);
};

const renderCustomerDetails = () => {
  customerDetails = shallow((container.find('InfoBox').props() as any).items[0].props.children[0]);
};

const getField = (fieldIndex: number) => {
  return (customerDetails
    .find('QuestionBox')
    .at(fieldIndex)
    .props() as any).inputFields[0];
};

const addSubsidiaries = (subsidiaries: unknown[]) => {
  const addSubsidiariesField = (customerDetails
    .find('SubQuestion')
    .at(0)
    .props() as any).items[0];

  addSubsidiariesField.props.onChange(subsidiaries);
};

const event = { target: { value: 'Test' } };
const dateFieldValues = { dd: '02', mm: '11', yyyy: '2000' };

describe('NewCompany', () => {
  beforeEach(() => {
    render();
    renderCustomerDetails();
  });

  test('the default export is a connected component', () => {
    const mappedProps = connectedContainer.find('NewCompany').props();

    expect(mappedProps).toEqual({});
  });

  test('NewCompany container matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  test('entering a company name updates the data.companyName state value', () => {
    const companyNameField = getField(0);
    companyNameField.props.onChange(event);

    expect(container.state().data.companyName).toBe(event.target.value);
  });

  test('entering a trading name updates the data.tradingName state value', () => {
    const companyNameField = getField(1);
    companyNameField.props.onChange(event);

    expect(container.state().data.tradingName).toBe(event.target.value);
  });

  test('Selecting a type status updates the data.typeStatus state value', () => {
    const typeStatus = 'Limited';
    const selectCompanyTypeStatus = customerDetails.find('SelectCompanyTypeStatus');
    (selectCompanyTypeStatus.props() as any).onChange(typeStatus);

    expect(container.state().data.typeStatus).toBe(typeStatus);
  });

  test('Selecting a business class updates the data.businessClass state value', () => {
    const businessClassOptionMultiChoice = getField(2);
    businessClassOptionMultiChoice.props.onChange('Public House');

    expect(container.state().data.businessClass).toBe('Public House');
  });

  test('changing the trading since date field updates the data.tradingSinceDate state value', () => {
    const dateOfBirthFields = getField(3);
    dateOfBirthFields.props.onChange(dateFieldValues);

    expect(container.state().data.tradingSinceDate).toBe(dateFieldValues);
  });

  test('entering a company reg number updates the data.companyNumber state value', () => {
    const companyNameField = getField(4);
    companyNameField.props.onChange(event);

    expect(container.state().data.registeredCoNumber).toBe(event.target.value);
  });

  test('Selecting is a subsidiary company updates the data.parentCompany state value', () => {
    const isSubsidiaryMultiChoice = getField(5);

    isSubsidiaryMultiChoice.props.onClick('Yes');

    expect(container.state().data.parentCompany).toBe(false);

    isSubsidiaryMultiChoice.props.onClick('No');

    expect(container.state().data.parentCompany).toBe(true);
  });

  test('selecting Yes as subsidiary company renders the Parent Company Name field', () => {
    const isSubsidiaryField = getField(5);
    isSubsidiaryField.props.onClick('Yes');
    renderCustomerDetails();
    const subsidiariesSubQuestion = customerDetails.find('SubQuestion').at(0);
    const companyNameSubQuestion = customerDetails.find('SubQuestion').at(1);

    expect((companyNameSubQuestion.props() as any).visible).toBe(true);
    expect((subsidiariesSubQuestion.props() as any).visible).toBe(false);
  });

  test('entering a parent company name updates the data.parentCompanyName state value', () => {
    const isSubsidiaryField = getField(5);
    isSubsidiaryField.props.onClick('Yes');
    renderCustomerDetails();
    const parentCompanyNameField = (customerDetails
      .find('SubQuestion')
      .at(1)
      .props() as any).items[0].props.inputFields[0];
    parentCompanyNameField.props.onChange(event);

    expect(container.state().data.parentCompanyName).toBe(event.target.value);
  });

  test('selecting No as subsidiary company renders the subsidiaries field', () => {
    const isSubsidiaryField = getField(5);
    isSubsidiaryField.props.onClick('No');
    renderCustomerDetails();
    const subsidiariesSubQuestion = customerDetails.find('SubQuestion').at(0);
    const companyNameSubQuestion = customerDetails.find('SubQuestion').at(1);

    expect((companyNameSubQuestion.props() as any).visible).toBe(false);
    expect((subsidiariesSubQuestion.props() as any).visible).toBe(true);
  });

  test('adding a subsidiary updates the data.subsidiaries state value', () => {
    addSubsidiaries([{}, {}, {}]);

    expect(container.state().data.subsidiaries!.length).toBe(3);
  });

  test('adding/updating the company name updates the parent company name of all subsidiaries', () => {
    const companyNameField = getField(0);
    addSubsidiaries([{}, {}, {}]);
    let companyName = 'Datamatters';
    companyNameField.props.onChange({ target: { value: companyName } });

    container.state().data.subsidiaries!.forEach(subsidiary => {
      expect(subsidiary.parentCompanyName).toBe(companyName);
    });

    companyName = 'Datamatters Ltd';
    companyNameField.props.onChange({ target: { value: companyName } });

    container.state().data.subsidiaries!.forEach(subsidiary => {
      expect(subsidiary.parentCompanyName).toBe(companyName);
    });
  });

  test('the parent company name of new subsidiaries is set to the company name if it is already present', () => {
    const companyNameField = getField(0);
    const companyName = 'Datamatters';
    companyNameField.props.onChange({ target: { value: companyName } });
    addSubsidiaries([{}, {}, {}]);

    container.state().data.subsidiaries!.forEach(subsidiary => {
      expect(subsidiary.parentCompanyName).toBe(companyName);
    });
  });
});
