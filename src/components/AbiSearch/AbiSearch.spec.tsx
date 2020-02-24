import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';

import { storyRenders } from './AbiSearch.stories';
import testStorySnapshots from '../../helpers/test/testStorySnapshots';

import { SEARCH_ABI_FETCH_HITS } from '../../actions/actionTypes';

let component: ReactWrapper;
const event = {
  currentTarget: {
    textContent: 'Test'
  }
};

const clickResult = () => {
  act(() => {
    (component.find('SearchBar').props() as any).onClick(event);
  });
  component.update();
};

describe('AbiSearch', () => {
  beforeEach(() => {
    component = mount(storyRenders.searchByDescription());
  });

  test('component story renders match snapshots', () => {
    testStorySnapshots(storyRenders);
  });

  test('abiSearchFetchResults dispatches the searchFetchResults action', () => {
    const searchBar = component.find('SearchBar');
    const { searchFetchResults } = searchBar.props() as any;
    const action = searchFetchResults();

    expect(action.type).toBe(SEARCH_ABI_FETCH_HITS);
  });

  test('When a result is selected, the SearchBar component is hidden', () => {
    clickResult();
    const searchBarClassNames = (component.find('SearchBar').props() as any).additionalClasses;

    expect(searchBarClassNames).toContain('hidden');
  });

  test('When the textfield is focused, the SearchBar component is visible', () => {
    clickResult();
    act(() => {
      (component
        .find('TextField')
        .at(0)
        .props() as any).onFocus();
    });
    component.update();
    const searchBarClassNames = (component.find('SearchBar').props() as any).additionalClasses;

    expect(searchBarClassNames).not.toContain('hidden');
  });

  test('When a result is selected, the result text appears in the TextField', () => {
    clickResult();

    expect(
      (component
        .find('TextField')
        .at(0)
        .props() as any).value
    ).toBe(event.currentTarget.textContent);
  });

  test("When no value is selected, the result text retains it's previous value", () => {
    clickResult();
    const clickOnNothingEvent = {
      currentTarget: {
        textContent: undefined
      }
    };
    act(() => {
      (component.find('SearchBar').props() as any).onClick(clickOnNothingEvent);
    });
    component.update();

    expect(
      (component
        .find('TextField')
        .at(0)
        .props() as any).value
    ).toBe(event.currentTarget.textContent);
  });

  test('The TextField onChange takes no action', () => {
    expect(
      (component
        .find('TextField')
        .at(0)
        .props() as any).onChange()
    ).toBe(null);
  });
});
