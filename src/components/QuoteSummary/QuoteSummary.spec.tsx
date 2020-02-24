import { storyRenders } from './QuoteSummary.stories';

import testStorySnapshots from '../../helpers/test/testStorySnapshots';

describe('QuoteSummary', () => {
  test('component story renders match snapshots', () => {
    testStorySnapshots(storyRenders);
  });
});
