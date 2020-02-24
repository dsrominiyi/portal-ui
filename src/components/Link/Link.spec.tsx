import { storyRenders } from './Link.stories';

import testStorySnapshots from '../../helpers/test/testStorySnapshots';

describe('Link', () => {
  test('component story renders match snapshots', () => {
    testStorySnapshots(storyRenders);
  });
});
