import { shallow } from 'enzyme';

import { storyRenders, options } from './MultiChoice.stories';
import testStorySnapshots from '../../helpers/test/testStorySnapshots';

describe('MultiChoice', () => {
  test('component story renders match snapshots', () => {
    testStorySnapshots(storyRenders);
  });

  test('onClick is called with the selected option', () => {
    const onClick = jest.fn();
    const MultiChoice = shallow(storyRenders.notSelected({ onClick }));
    const buttons = MultiChoice.find('QuestionButton');

    buttons.forEach((button, index) => {
      button.simulate('click');

      expect(onClick).toHaveBeenCalledWith(options[index]);
    });
  });
});
