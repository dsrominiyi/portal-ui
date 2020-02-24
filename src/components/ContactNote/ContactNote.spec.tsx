import { storyRenders } from './ContactNote.stories';

import testStorySnapshots from '../../helpers/test/testStorySnapshots';

describe('ContactNote', () => {
  test('component story renders match snapshots', () => {
    testStorySnapshots(storyRenders);
  });
});
