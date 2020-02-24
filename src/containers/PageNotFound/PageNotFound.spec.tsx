import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import PageNotFound from '.';

let container: ShallowWrapper;

describe('PageNotFound', () => {
  beforeEach(() => {
    container = shallow(<PageNotFound />);
  });

  test('PageNotFound container matches snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});
