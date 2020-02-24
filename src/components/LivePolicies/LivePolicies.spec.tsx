import { storyRenders } from './LivePolicies.stories';

import testStorySnapshots from '../../helpers/test/testStorySnapshots';

describe('LivePolicies', () => {
  test('component story renders match snapshots', () => {
    testStorySnapshots(storyRenders);
  });
});
