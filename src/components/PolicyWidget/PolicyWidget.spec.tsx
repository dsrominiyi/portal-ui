import { storyRenders } from './PolicyWidget.stories';

import testStorySnapshots from '../../helpers/test/testStorySnapshots';

describe('PolicyWidget', () => {
  test('component story renders match snapshots', () => {
    testStorySnapshots(storyRenders);
  });
});
