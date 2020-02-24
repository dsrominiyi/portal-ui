import { storyRenders } from './Lookup.stories';

import testStorySnapshots from '../../helpers/test/testStorySnapshots';

describe('Lookup', () => {
  test('component story renders match snapshots', () => {
    testStorySnapshots(storyRenders);
  });
});
