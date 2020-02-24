import { shallow, ShallowWrapper } from 'enzyme';
import { storyRenders, headers, rows, render } from './TableDisplay.stories';
import testStorySnapshots from '../../helpers/test/testStorySnapshots';

let component: ShallowWrapper;

describe('TableDisplay', () => {
  test('component story renders match snapshots', () => {
    testStorySnapshots(storyRenders);
  });

  test('onClick is called when Edit button is clicked', () => {
    const onClick = jest.fn();
    component = shallow(render(headers, rows, '', onClick, jest.fn())());
    const button = component.find('Button').at(0);
    button.simulate('click', {});

    expect(onClick).toHaveBeenCalled();
  });

  test('onClick is called when Delete button is clicked', () => {
    const onClick = jest.fn();
    component = shallow(render(headers, rows, '', jest.fn(), onClick)());
    const button = component.find('Button').at(1);
    button.simulate('click', {});

    expect(onClick).toHaveBeenCalled();
  });
});
