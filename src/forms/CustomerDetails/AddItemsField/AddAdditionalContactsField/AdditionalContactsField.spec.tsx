import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import AddAdditionalContactsField from '.';

let component: ShallowWrapper;
const onChange = jest.fn();

describe('AddAdditionalContactsField', () => {
  test('AddAdditionalContactsField matches snapshot', () => {
    component = shallow(<AddAdditionalContactsField onChange={onChange} />);
    expect(component).toMatchSnapshot();
  });
});
