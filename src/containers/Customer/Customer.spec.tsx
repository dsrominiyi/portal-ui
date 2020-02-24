import React from 'react';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import { shallow, mount, ShallowWrapper } from 'enzyme';

import ConnectedCustomer, { Customer } from '.';

import mockData from '../../../__mocks__/mock-data.json';

const mockStore = createMockStore([]);

const initialProps = {
  customer: mockData.customers[0],
  quotes: mockData.quotes,
  policies: mockData.policies,
  contactHistory: mockData.contactHistory
};

let container: ShallowWrapper;
const connectedContainer = mount(
  <Provider store={mockStore({ customer: initialProps })}>
    <ConnectedCustomer />
  </Provider>
);

const render = (props: any = initialProps) => {
  container = shallow(<Customer {...props} />);
};

describe('Customer', () => {
  beforeEach(() => {
    render();
  });

  test('the default export is a connected component', () => {
    const mappedProps = connectedContainer.find('Customer').props();

    expect(mappedProps).toEqual(initialProps);
  });

  it('matches snapshot for an individual customer', () => {
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot for a company customer', () => {
    render({ ...initialProps, customer: mockData.customers[1] });

    expect(container).toMatchSnapshot();
  });

  test('matches snapshot with no quotes associated', () => {
    render({ ...initialProps, quotes: [] });

    expect(container).toMatchSnapshot();
  });

  test('matches snapshot with no policies associated', () => {
    render({ ...initialProps, policies: [] });

    expect(container).toMatchSnapshot();
  });

  test('matches snapshot with no contact note history associated', () => {
    render({ ...initialProps, contactHistory: [] });

    expect(container).toMatchSnapshot();
  });

  test('HandleNewQuote function is triggered when New Quote button is clicked', () => {
    const button = container.find('Button').at(0);
    const event = { preventDefault: jest.fn() };
    window.alert = jest.fn();
    button.simulate('click', event);

    expect(event.preventDefault).toHaveBeenCalled();
  });
});
