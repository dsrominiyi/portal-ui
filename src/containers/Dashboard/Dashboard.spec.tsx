import React from 'react';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import { shallow, mount, ShallowWrapper } from 'enzyme';

import ConnectedDashboard, { Dashboard } from '.';

const mockStore = createMockStore([]);

let container: ShallowWrapper;
const connectedContainer = mount(
  <Provider store={mockStore({})}>
    <ConnectedDashboard />
  </Provider>
);

const render = () => {
  container = shallow(<Dashboard />);
};

describe('Dashboard', () => {
  beforeEach(() => {
    render();
  });

  test('the default export is a connected component', () => {
    const mappedProps = connectedContainer.find('Dashboard').props();

    expect(mappedProps).toEqual({});
  });

  test('Dashboard matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});
