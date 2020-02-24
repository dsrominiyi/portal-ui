import { mount, ReactWrapper } from 'enzyme';
import { storyRenders } from './SubQuestion.stories';

import testStorySnapshots from '../../helpers/test/testStorySnapshots';

let component: ReactWrapper;
const mutationObserverInstance: MutationObserver = (MutationObserver as jest.Mock)();

describe('SubQuestion', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    component = mount(storyRenders.single({ visible: false }));
  });

  test('component story renders match snapshots', () => {
    testStorySnapshots(storyRenders, ['withParentQuestion']);
  });

  test('the component height is set when its made visible', () => {
    component.setProps({ visible: true });
    let containerDiv = component.find('.subQuestionContainer');

    // scroll height is 0 in jsdom
    expect(containerDiv.getDOMNode().getAttribute('style')).toBe('height: 0px; overflow: visible;');

    component.setProps({ visible: false });
    containerDiv = component.find('.subQuestionContainer');

    expect(containerDiv.getDOMNode().getAttribute('style')).toBe('overflow: hidden;');
  });

  test('the component height is set when dom changes occur', () => {
    expect(MutationObserver).toHaveBeenCalledWith(expect.any(Function));
    expect(mutationObserverInstance.observe).toHaveBeenCalledWith(expect.any(Node), {
      childList: true,
      subtree: true
    });
  });
});
