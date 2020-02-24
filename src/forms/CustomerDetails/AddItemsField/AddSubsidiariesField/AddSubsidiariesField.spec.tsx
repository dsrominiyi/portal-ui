import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import AddSubsidiariesField from '.';

let component: ShallowWrapper;
const onChange = jest.fn();

describe('AddSubsidiariesField', () => {
  test('AddSubsidiariesField matches snapshot', () => {
    component = shallow(<AddSubsidiariesField onChange={onChange} />);
    expect(component).toMatchSnapshot();
  });
});
