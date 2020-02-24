import { storyRenders } from './InfoBox.stories';

import testStorySnapshots from '../../helpers/test/testStorySnapshots';

describe('InfoBox', () => {
  test('component story renders match snapshots', () => {
    testStorySnapshots(storyRenders);
  });
});
