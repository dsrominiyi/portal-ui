import { storyRenders } from './AffixedField.stories';

import testStorySnapshots from '../../../helpers/test/testStorySnapshots';

describe('AffixedField', () => {
  test('component story renders match snapshots', () => {
    testStorySnapshots(storyRenders);
  });
});
