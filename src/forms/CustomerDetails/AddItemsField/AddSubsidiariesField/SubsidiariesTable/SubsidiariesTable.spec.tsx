import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import SubsidiariesTable from '.';

import mockData from '../../../../../../__mocks__/mock-data.json';

let table: ShallowWrapper;
const subsidiaries: Company[] = [mockData.customers[1].data, mockData.customers[1].data];

describe('SubsidiariesTable', () => {
  beforeEach(() => {
    table = shallow(
      <SubsidiariesTable items={subsidiaries} onEdit={() => null} onDelete={() => null} />
    );
  });

  test('SubsidiariesTable matches snapshot', () => {
    expect(table).toMatchSnapshot();
  });

  test('SubsidiariesTable with a missing tradingSinceDate matches snapshot', () => {
    table.setProps({ items: [subsidiaries[0], { ...subsidiaries[1], tradingSinceDate: '' }] });

    expect(table).toMatchSnapshot();
  });
});
