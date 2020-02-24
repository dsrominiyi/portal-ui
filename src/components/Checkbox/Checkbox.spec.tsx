import { storyRenders } from './Checkbox.stories';

import testStorySnapshots from '../../helpers/test/testStorySnapshots';

describe('Checkbox', () => {
  test('component story renders match snapshots', () => {
    testStorySnapshots(storyRenders);
  });
});
