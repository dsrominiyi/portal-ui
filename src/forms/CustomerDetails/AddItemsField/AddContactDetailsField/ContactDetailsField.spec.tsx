import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import ContactDetailsField from '.';

let component: ShallowWrapper;
const onChange = jest.fn();

describe('ContactDetailsField', () => {
  test('ContactDetailsField matches snapshot', () => {
    component = shallow(<ContactDetailsField onChange={onChange} />);
    expect(component).toMatchSnapshot();
  });
});
