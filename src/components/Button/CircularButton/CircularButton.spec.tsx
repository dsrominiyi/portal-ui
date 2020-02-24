import { storyRenders } from './CircularButton.stories';

import testStorySnapshots from '../../../helpers/test/testStorySnapshots';

describe('CircularButton', () => {
  test('component story renders match snapshots', () => {
    testStorySnapshots(storyRenders);
  });
});
