import { storyRenders } from './Button.stories';

import testStorySnapshots from '../../helpers/test/testStorySnapshots';

describe('Button', () => {
  test('component story renders match snapshots', () => {
    testStorySnapshots(storyRenders);
  });
});
