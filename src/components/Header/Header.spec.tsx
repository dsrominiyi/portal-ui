import { storyRenders } from './Header.stories';

import testStorySnapshots from '../../helpers/test/testStorySnapshots';

describe('Header', () => {
  test('component story renders match snapshots', () => {
    testStorySnapshots(storyRenders);
  });
});
