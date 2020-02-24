import { storyRenders } from './UserImage.stories';

import testStorySnapshots from '../../helpers/test/testStorySnapshots';

describe('UserImage', () => {
  test('component story renders match snapshots', () => {
    testStorySnapshots(storyRenders);
  });
});
