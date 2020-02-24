import { storyRenders } from './TextField.stories';

import testStorySnapshots from '../../helpers/test/testStorySnapshots';

describe('TextField', () => {
  test('component story renders match snapshots', () => {
    testStorySnapshots(storyRenders);
  });
});
