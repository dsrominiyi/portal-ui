import { storyRenders } from './CustomerQuote.stories';

import testStorySnapshots from '../../helpers/test/testStorySnapshots';

describe('CustomerQuote', () => {
  test('component story renders match snapshots', () => {
    testStorySnapshots(storyRenders);
  });
});
