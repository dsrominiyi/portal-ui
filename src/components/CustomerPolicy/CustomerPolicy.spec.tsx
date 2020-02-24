import { storyRenders } from './CustomerPolicy.stories';

import testStorySnapshots from '../../helpers/test/testStorySnapshots';

describe('CustomerPolicy', () => {
  test('component story renders match snapshots', () => {
    testStorySnapshots(storyRenders);
  });
});
