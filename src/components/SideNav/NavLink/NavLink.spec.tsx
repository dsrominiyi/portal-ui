import { storyRenders } from './NavLink.stories';

import testStorySnapshots from '../../../helpers/test/testStorySnapshots';

describe('NavLink', () => {
  test('component story renders match snapshots', () => {
    testStorySnapshots(storyRenders);
  });
});
