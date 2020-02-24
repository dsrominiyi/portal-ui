import { storyRenders } from './PolicyHolderDetails.stories';

import testStorySnapshots from '../../../helpers/test/testStorySnapshots';

describe('PolicyHolderDetails', () => {
  test('component story renders match snapshots', () => {
    testStorySnapshots(storyRenders);
  });
});
