import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import SelectCompanyTypeStatus, { Props } from '.';

let fields: ShallowWrapper<Props>;

const onChange = jest.fn();
let standardOptionsMultiChoice: any;
let otherOptions: any;
let otherOptionsDropdown: any;

const update = () => {
  standardOptionsMultiChoice = (fields.props() as any).children[0].props.inputFields[0];
  otherOptions = (fields.props() as any).children[1];
  otherOptionsDropdown = otherOptions.props.items[0].props.inputFields[0];
};

describe('SelectCompanyTypeStatus', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fields = shallow(
      <SelectCompanyTypeStatus typeStatus={CompanyTypeStatus.Limited} onChange={onChange} />
    );
    update();
  });

  test('SelectCompanyTypeStatus matches snapshot', () => {
    expect(fields).toMatchSnapshot();
  });

  test('SelectCompanyTypeStatus with alt typeStatus matches snapshot', () => {
    fields.setProps({ typeStatus: CompanyTypeStatus.AssociationClubSociety });

    expect(fields).toMatchSnapshot();
  });

  test('Selecting a type status calls onChange with the value', () => {
    const typeStatus = CompanyTypeStatus.Limited;
    standardOptionsMultiChoice.props.onClick(typeStatus);

    expect(onChange).toHaveBeenCalledWith(typeStatus);
  });

  test('selecting the Other type status option renders the alternate options dropdown', () => {
    expect(otherOptions.props.visible).toBe(false);

    fields.setProps({ typeStatus: CompanyTypeStatus.Other });
    update();

    expect(otherOptions.props.visible).toBe(true);
  });

  test('Selecting an alternate type status calls onChange with the value', () => {
    const typeStatus = CompanyTypeStatus.AssociationClubSociety;
    otherOptionsDropdown.props.onChange(typeStatus);

    expect(onChange).toHaveBeenCalledWith(typeStatus);
  });
});
