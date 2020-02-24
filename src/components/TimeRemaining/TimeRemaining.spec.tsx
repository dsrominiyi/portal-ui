import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { utc as moment } from 'moment';

import { storyRenders } from './TimeRemaining.stories';

import testStorySnapshots from '../../helpers/test/testStorySnapshots';

let component: ShallowWrapper;

describe('TimeRemaining', () => {
  test('component story renders match snapshots', () => {
    testStorySnapshots(storyRenders, ['currentDate']);
  });

  it('should match the snapshot if current date is not passed in', () => {
    const props = {
      startDate: '2019-01-01',
      endDate: '2019-10-01'
    };

    const startDate = moment(props.startDate, 'YYYY-MM-DD');
    const endDate = moment(props.endDate, 'YYYY-MM-DD');
    const currentDate = moment('2019-05-01', 'YYYY-MM-DD');

    const momentMock = jest.fn();
    const utcMock = jest.fn();
    utcMock
      .mockImplementationOnce(() => startDate)
      .mockImplementationOnce(() => endDate)
      .mockImplementationOnce(() => currentDate);

    const durationMock = { asDays: jest.fn() };
    (momentMock as any).duration = jest.fn(() => durationMock);
    (momentMock as any).utc = utcMock;
    durationMock.asDays.mockImplementationOnce(() => 273).mockImplementationOnce(() => 153);

    jest.doMock('moment', () => momentMock);
    jest.resetModules();
    const TimeRemaining = require('.').default;

    component = shallow(<TimeRemaining {...props} />);

    expect(component).toMatchSnapshot();
  });
});
