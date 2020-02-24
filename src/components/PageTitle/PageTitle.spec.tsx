import { storyRenders } from './PageTitle.stories';
import testStorySnapshots from '../../helpers/test/testStorySnapshots';

describe('PageTitle', () => {
  test('component story renders match snapshots', () => {
    testStorySnapshots(storyRenders);
  });
});
