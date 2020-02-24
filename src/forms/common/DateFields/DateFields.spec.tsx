import { shallow, ShallowWrapper } from 'enzyme';
import { fieldValues, storyRenders } from './DateFields.stories';

import testStorySnapshots from '../../../helpers/test/testStorySnapshots';

let component: ShallowWrapper;
const onChange = jest.fn();

describe('DateFields', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    component = shallow(storyRenders.withValues({ onChange }));
  });

  test('component story renders match snapshots', () => {
    testStorySnapshots(storyRenders);
  });

  test('changing the day field calls onChange with updated field values', () => {
    const { mm, yyyy } = fieldValues;
    const dd = '22';
    const event = { target: { value: dd } };
    component
      .find('TextField')
      .at(0)
      .simulate('change', event);

    expect(onChange).toHaveBeenCalledWith({ dd, mm, yyyy });
  });

  test('changing the month field calls onChange with updated field values', () => {
    const { dd, yyyy } = fieldValues;
    const mm = '07';
    const event = { target: { value: mm } };
    component
      .find('TextField')
      .at(1)
      .simulate('change', event);

    expect(onChange).toHaveBeenCalledWith({ dd, mm, yyyy });
  });

  test('changing the year field calls onChange with updated field values', () => {
    const { dd, mm } = fieldValues;
    const yyyy = '1996';
    const event = { target: { value: yyyy } };
    component
      .find('TextField')
      .at(2)
      .simulate('change', event);

    expect(onChange).toHaveBeenCalledWith({ dd, mm, yyyy });
  });

  test('a leading 0 is added to a single digit day value on blur from the field', () => {
    const { mm, yyyy } = fieldValues;
    const dd = '2';
    const event = { target: { value: dd } };
    component
      .find('TextField')
      .at(0)
      .simulate('blur', event);

    expect(onChange).toHaveBeenCalledWith({ dd: '02', mm, yyyy });
  });

  test('a leading 0 is added to a single digit month value on blur from the field', () => {
    const { dd, yyyy } = fieldValues;
    const mm = '7';
    const event = { target: { value: mm } };
    component
      .find('TextField')
      .at(1)
      .simulate('blur', event);

    expect(onChange).toHaveBeenCalledWith({ dd, mm: '07', yyyy });
  });

  test('no change is made on blur from the field if the value is 2 digits', () => {
    const { dd, mm, yyyy } = fieldValues;
    const event = { target: { value: dd } };
    component
      .find('TextField')
      .at(0)
      .simulate('blur', event);

    expect(onChange).toHaveBeenCalledWith({ dd, mm, yyyy });
  });

  test('non numeric values are stripped from the day field', () => {
    const { mm, yyyy } = fieldValues;
    const dd = '2b';
    const event = { target: { value: dd } };
    component
      .find('TextField')
      .at(0)
      .simulate('change', event);

    expect(onChange).toHaveBeenCalledWith({ dd: '2', mm, yyyy });
  });

  test('non numeric values are stripped from the month field', () => {
    const { dd, yyyy } = fieldValues;
    const mm = '7£';
    const event = { target: { value: mm } };
    component
      .find('TextField')
      .at(1)
      .simulate('change', event);

    expect(onChange).toHaveBeenCalledWith({ dd, mm: '7', yyyy });
  });

  test('non numeric values are stripped from the year field', () => {
    const { dd, mm } = fieldValues;
    const yyyy = '199K';
    const event = { target: { value: yyyy } };
    component
      .find('TextField')
      .at(2)
      .simulate('change', event);

    expect(onChange).toHaveBeenCalledWith({ dd, mm, yyyy: '199' });
  });
});
