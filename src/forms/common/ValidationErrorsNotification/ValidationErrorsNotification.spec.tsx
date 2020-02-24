import { storyRenders } from './ValidationErrorsNotification.stories';

import testStorySnapshots from '../../../helpers/test/testStorySnapshots';

describe('ValidationErrorsNotification', () => {
  test('component story renders match snapshots', () => {
    testStorySnapshots(storyRenders);
  });
});
