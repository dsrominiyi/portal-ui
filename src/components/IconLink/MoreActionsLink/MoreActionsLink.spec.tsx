import { storyRenders } from './MoreActionsLink.stories';

import testStorySnapshots from '../../../helpers/test/testStorySnapshots';

describe('IconLinkAction', () => {
  test('component story renders match snapshots', () => {
    testStorySnapshots(storyRenders);
  });
});
