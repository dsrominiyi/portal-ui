import { mount, ReactWrapper } from 'enzyme';

import { storyRenders } from './SearchHeader.stories';
import testStorySnapshots from '../../../helpers/test/testStorySnapshots';

import { SEARCH_CUSTOMER_FETCH_HITS } from '../../../actions/actionTypes';

let component: ReactWrapper;

describe('SearchHeader', () => {
  beforeEach(() => {
    component = mount(storyRenders.noResults());
  });

  test('component story renders match snapshots', () => {
    testStorySnapshots(storyRenders, [], true);
  });

  test('searchFetchResults dispatches the customerSearchFetchSuggestions action', () => {
    const searchBar = component.find('SearchBar');
    const { searchFetchResults } = searchBar.props() as any;
    const action = searchFetchResults();

    expect(action.type).toBe(SEARCH_CUSTOMER_FETCH_HITS);
  });

  test('buildCustomerUrl builds the expected url', () => {
    const { buildUrl: buildCustomerUrl } = (component
      .find('Header')
      .props() as any).leftItems[0].props;
    const id = '203';

    expect(buildCustomerUrl(id)).toBe(`/customer/${id}`);
  });

  test('buildCustomerResultsUrl builds the expected url', () => {
    const { buildMoreResultsUrl: buildCustomerResultsUrl } = (component
      .find('Header')
      .props() as any).leftItems[0].props;
    const searchTerm = 'Test';

    expect(buildCustomerResultsUrl(searchTerm)).toBe(`/customer/search/?term=${searchTerm}`);
  });
});
