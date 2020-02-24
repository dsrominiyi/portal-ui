import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import SelectTitle, { Props } from '.';

let fields: ShallowWrapper<Props>;
let standardTitles: any;
let otherTitles: any;
const onChange = jest.fn();

const update = () => {
  [standardTitles, otherTitles] = (fields.props() as any).children;
};

describe('SelectTitle', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fields = shallow(<SelectTitle onChange={onChange} />);
    update();
  });

  test('SelectTitle matches snapshot', () => {
    expect(fields).toMatchSnapshot();
  });

  test('selecting a standard title calls onChange with the value', () => {
    const title = 'Mr';
    standardTitles.props.inputFields[0].props.onClick(title);

    expect(onChange).toHaveBeenCalledWith(title);
  });

  test('the other titles dropdown is made visible if title is "Other"', () => {
    expect(otherTitles.props.visible).toBe(false);

    fields.setProps({ title: 'Other' });
    update();

    expect(otherTitles.props.visible).toBe(true);
  });

  test('selecting an alternative title calls onChange with the value', () => {
    const title = 'Mx';
    otherTitles.props.items[0].props.inputFields[0].props.onChange(title);

    expect(onChange).toHaveBeenCalledWith(title);
  });

  test('"Other" under the standard titles is selected if an alternative title from the dropdown is selected', () => {
    fields.setProps({ title: 'Mx' });
    update();

    expect(standardTitles.props.inputFields[0].props.selectedOption).toBe('Other');
  });
});
