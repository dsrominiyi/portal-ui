import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import AddressesTable from '.';
import { emptyAddress } from '../../../AddressForm';

let table: ShallowWrapper;
const addresses = [
  {
    ...emptyAddress,
    type: AddressType.Correspondence,
    buildingName: 'Anyhouse',
    thoroughfare: 'Any Road',
    town: 'Any City',
    county: 'Anywhere'
  },
  {
    ...emptyAddress,
    type: AddressType.Residential,
    buildingNumber: '20',
    thoroughfare: 'Any Street',
    town: 'Any Town',
    county: 'Anyshire'
  }
];

describe('AddressesTable', () => {
  beforeEach(() => {
    table = shallow(<AddressesTable items={addresses} onEdit={() => null} onDelete={() => null} />);
  });

  test('AddressesTable matches snapshot', () => {
    expect(table).toMatchSnapshot();
  });

  test('AddressesTable with empty address matches snapshot', () => {
    table = shallow(
      <AddressesTable items={[{ ...emptyAddress }]} onEdit={() => null} onDelete={() => null} />
    );
    expect(table).toMatchSnapshot();
  });
});
