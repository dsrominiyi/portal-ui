import { getTotalGwp } from '.';
import { storyRenders } from './TotalGWP.stories';

import testStorySnapshots from '../../helpers/test/testStorySnapshots';

describe('TotalGWP', () => {
  test('component story renders match snapshots', () => {
    testStorySnapshots(storyRenders);
  });

  test('gwp reducer function returns zero with no rate on a policy', () => {
    const policies: Policy[] = [
      {
        id: '1',
        type: 'test',
        insurer: 'test-broker',
        startDate: '2019-01-01',
        endDate: '2020-01-01'
      }
    ];

    expect(getTotalGwp(policies)).toEqual(0);
  });
});
