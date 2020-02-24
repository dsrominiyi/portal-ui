import { shallow } from 'enzyme';
import { render, storyRenders } from './JourneyProgress.stories';

import testStorySnapshots from '../../helpers/test/testStorySnapshots';

describe('JourneyProgress', () => {
  test('component story renders match snapshots', () => {
    testStorySnapshots(storyRenders);
  });

  test('onClick function is triggered when chevron is clicked', () => {
    const onClick = jest.fn();
    const component = shallow(
      render(
        [
          { title: 'Step One', url: '/step/1' },
          { title: 'Step Two', url: '/step/2' },
          { title: 'Step Three', url: '/step/3' }
        ],
        0,
        onClick
      )()
    );
    const buttons = component.find('.step');

    buttons.forEach((button, index) => {
      button.simulate('click');

      expect(onClick).toHaveBeenCalledWith(index);
    });
  });
});
