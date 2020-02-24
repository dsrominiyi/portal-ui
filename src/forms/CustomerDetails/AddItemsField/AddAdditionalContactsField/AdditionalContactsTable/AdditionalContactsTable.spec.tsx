import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import AdditionalContactsTable from '.';

let table: ShallowWrapper;
const additionalContacts = [
  {
    name: { title: 'Mr', forename: 'Robert', middleName: 'Dave', surname: 'Smith' },
    contactDetails: [{ type: ContactType.HomeNumber, detail: '08589392900' }],
    relationship: AdditionalContactRelationship.Sibling
  },
  {
    name: { title: 'Mrs', forename: 'Jane', surname: 'Smith' },
    contactDetails: [{ type: ContactType.WorkEmail, detail: 'jsmith@test.com' }],
    relationship: AdditionalContactRelationship.Spouse
  }
];

describe('AdditionalContactsTable', () => {
  beforeEach(() => {
    table = shallow(
      <AdditionalContactsTable
        items={additionalContacts}
        onEdit={() => null}
        onDelete={() => null}
      />
    );
  });

  test('AdditionalContactsTable matches snapshot', () => {
    expect(table).toMatchSnapshot();
  });
});
