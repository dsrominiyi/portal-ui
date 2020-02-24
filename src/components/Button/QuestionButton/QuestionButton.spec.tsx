import { storyRenders } from './QuestionButton.stories';

import testStorySnapshots from '../../../helpers/test/testStorySnapshots';

describe('QuestionButton', () => {
  test('component story renders match snapshots', () => {
    testStorySnapshots(storyRenders);
  });
});
