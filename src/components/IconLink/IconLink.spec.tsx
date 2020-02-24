import { storyRenders } from './IconLink.stories';

import testStorySnapshots from '../../helpers/test/testStorySnapshots';

describe('IconLink', () => {
  test('component story renders match snapshots', () => {
    testStorySnapshots(storyRenders);
  });
});
