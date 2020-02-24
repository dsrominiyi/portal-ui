import { storyRenders } from './UserLink.stories';

import testStorySnapshots from '../../helpers/test/testStorySnapshots';

describe('IconLink', () => {
  test('component story renders match snapshots', () => {
    testStorySnapshots(storyRenders);
  });
});
