import { storyRenders } from './QuestionBox.stories';

import testStorySnapshots from '../../helpers/test/testStorySnapshots';

describe('QuestionBox', () => {
  test('component story renders match snapshots', () => {
    testStorySnapshots(storyRenders);
  });
});
