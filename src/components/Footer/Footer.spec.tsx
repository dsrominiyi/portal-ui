import { storyRenders } from './Footer.stories';

import testStorySnapshots from '../../helpers/test/testStorySnapshots';

describe('Footer', () => {
  test('component story renders match snapshots', () => {
    testStorySnapshots(storyRenders);
  });
});
