import React from 'react';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import { shallow, mount, ShallowWrapper } from 'enzyme';

import ConnectedLogin, { Login } from '.';

const mockStore = createMockStore([]);

let container: ShallowWrapper;
const connectedContainer = mount(
  <Provider store={mockStore({})}>
    <ConnectedLogin />
  </Provider>
);

describe('Login', () => {
  beforeEach(() => {
    container = shallow(<Login />);
  });

  test('the default export is a connected component', () => {
    const mappedProps = connectedContainer.find('Login').props();

    expect(mappedProps).toEqual({});
  });

  test('container matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  test('typing in the email address field updates the email state value', () => {
    const emailAddress = 'test@tester.com';
    const event = { target: { value: emailAddress } };
    const emailInput = container.find('TextField').at(0);
    emailInput.simulate('change', event);

    expect(container.state('email')).toBe(emailAddress);
  });

  test('typing in the password field updates the password state value', () => {
    const password = 'Test.Pass-123!';
    const event = { target: { value: password } };
    const passwordInput = container.find('TextField').at(1);
    passwordInput.simulate('change', event);

    expect(container.state('password')).toBe(password);
  });

  test('checking the remember me checkbox updates the rememberMe state value', () => {
    const rememberMeCheckbox = container.find('Checkbox').at(0);
    rememberMeCheckbox.simulate('change');

    expect(container.state('rememberMe')).toBe(true);
  });

  test('clicking the login button forwards to the correct url', () => {
    delete window.location;
    window.location = { assign: jest.fn() } as any;
    const loginButton = container.find('Button').at(0);
    loginButton.simulate('click', { preventDefault: () => null });

    expect(window.location.assign).toHaveBeenCalledWith('/dashboard');
  });
});
