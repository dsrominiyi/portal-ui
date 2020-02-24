import { shallow } from 'enzyme';

import { storyRenders, dropdownTestData, render } from './Dropdown.stories';
import testStorySnapshots from '../../helpers/test/testStorySnapshots';

describe('Dropdown', () => {
  test('component story renders match snapshots', () => {
    testStorySnapshots(storyRenders);
  });

  test('onChange is called with the newly selected value', () => {
    const onChange = jest.fn();
    const event = { target: { value: 'testVal' } };
    const dropdown = shallow(render(dropdownTestData, undefined, onChange)());
    dropdown.find('select').simulate('change', event);

    expect(onChange).toHaveBeenCalledWith(event.target.value);
  });
});
