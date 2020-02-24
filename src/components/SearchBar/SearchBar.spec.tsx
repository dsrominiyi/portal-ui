import { shallow, ShallowWrapper } from 'enzyme';
import { storyRenders } from './SearchBar.stories';
import testStorySnapshots from '../../helpers/test/testStorySnapshots';

import SearchBar from '.';

let component: ShallowWrapper;
const hitResults = {
  start: 0,
  found: 3,
  hit: [
    { id: '001', fields: { description: 'test 1', netval: '001' } },
    { id: '002', fields: { description: 'test 2', netval: '002' } },
    { id: '003', fields: { description: 'test 3', netval: '003' } }
  ]
};

describe('User', () => {
  beforeEach(() => {
    component = shallow(storyRenders.twoResults());
  });

  test('component story renders match snapshots', () => {
    testStorySnapshots(storyRenders);
  });

  test('isSearchSuggestion returns true if results are search suggestions type', () => {
    const searchResults = {
      id: '001',
      score: 3,
      suggestion: 'string'
    };

    expect(SearchBar.isSearchSuggestion(searchResults)).toBe(true);
  });

  test('isSearchSuggestion returns false if results are search hits type', () => {
    const searchResults = {
      id: '001',
      fields: {}
    };

    expect(SearchBar.isSearchSuggestion(searchResults)).toBe(false);
  });

  test('SearchBar updates phrase as phrase is typed', () => {
    component = shallow(storyRenders.noResults());
    const searchTerm = 'Test Search';
    const searchTermInput = component.find('TextField');
    const event = { target: { value: searchTerm } };
    searchTermInput.simulate('change', event);

    expect(component.state('searchTerm')).toBe(searchTerm);
  });

  test('SearchBar highlights matches for suggestions', () => {
    const searchTerm = 'Tes';
    component.setState({ searchTerm });
    const firstResult = component.find('Link').first();
    const matchedTextElement = (firstResult.props().label as any).props.children[1];

    expect(matchedTextElement.props.children).toBe(searchTerm);
  });

  test('SearchBar highlights matches for hits', () => {
    const searchTerm = 'Tes';
    component.setState({ searchTerm });
    component.setProps({ searchResults: hitResults });
    const firstResult = component.find('Link').first();
    const matchedTextElement = (firstResult.props().label as any).props.children[1];

    expect(matchedTextElement.props.children).toBe(searchTerm.toLowerCase());
  });

  test('SearchBar highlights matches for hits where showResultFields is defined', () => {
    const searchTerm = 'Tes';
    component.setState({ searchTerm });
    component.setProps({ searchResults: hitResults, showResultFields: ['description'] });
    const firstResult = component.find('Link').first();
    const matchedTextElement = (firstResult.props().label as any).props.children[1];

    expect(matchedTextElement.props.children).toBe(searchTerm.toLowerCase());
  });

  test('SearchBar does not highlight when a returned phrase does not match the typed phrase', () => {
    const searchTerm = 'tim';
    component.setState({ searchTerm });
    const firstResult = component.find('Link').first();

    expect(firstResult.props().label).toBe('Toby Test');
  });

  test('SearchBar does not render results if there is no searchTerm', () => {
    const searchTerm = 'Test';
    component.setState({ searchTerm });
    component.setProps({ searchResults: hitResults });
    component.setState({ searchTerm: '' });

    expect(component.find('.results').length).toBe(0);
  });
});
