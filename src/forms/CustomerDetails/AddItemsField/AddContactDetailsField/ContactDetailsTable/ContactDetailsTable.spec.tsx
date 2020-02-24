import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import ContactDetailsTable from '.';

let table: ShallowWrapper;
const contactsDetails = [
  { type: ContactType.HomeNumber, detail: '08589392900' },
  { type: ContactType.WorkEmail, detail: 'jsmith@test.com' }
];

describe('ContactDetailsTable', () => {
  beforeEach(() => {
    table = shallow(
      <ContactDetailsTable items={contactsDetails} onEdit={() => null} onDelete={() => null} />
    );
  });

  test('ContactDetailsTable matches snapshot', () => {
    expect(table).toMatchSnapshot();
  });
});
