import React from 'react';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import { shallow, mount, ShallowWrapper } from 'enzyme';

import ConnectedSearchResults, { SearchResults, Props } from '.';

const mockStore = createMockStore([]);
const props: Props = {
  customers: [],
  searchTerm: ''
};
let container: ShallowWrapper<Props, SearchResults>;
const connectedContainer = mount(
  <Provider store={mockStore({})}>
    <ConnectedSearchResults {...props} />
  </Provider>
);

const render = () => {
  container = shallow(<SearchResults {...props} />);
};

describe('Customer Search Results Page', () => {
  beforeEach(() => {
    render();
  });

  test('the default export is a connected component', () => {
    const mappedProps = connectedContainer.find('SearchResults').props();

    expect(mappedProps).toEqual(props);
  });

  test('SearchResults container matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  test('The onRowClick function is executed when a row is clicked', () => {
    const event = { preventDefault: jest.fn() };
    window.alert = jest.fn();
    const resultsTable: ShallowWrapper = shallow(
      (container.find('InfoBox').props() as any).items[0]
    );
    const row = resultsTable.find('tr').at(1);
    row.simulate('click', event);

    expect(event.preventDefault).toHaveBeenCalled();
  });
});
