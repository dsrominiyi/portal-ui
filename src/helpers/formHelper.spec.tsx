import { shallow } from 'enzyme';

import { buildInput } from './formHelper';

describe('formHelper', () => {
  describe('buldInput', () => {
    test('AbiSearch input passes and empty string as the codeListId if none is provided', () => {
      const inputBox = buildInput({
        type: InputType.AbiSearch,
        label: 'test',
        onChange: () => null
      });

      expect(inputBox.props.inputFields[0].props.codeListId).toBe('');
    });

    test('Dropdown input with validation errors matches snapshot', () => {
      const inputBox = buildInput(
        {
          type: InputType.Dropdown,
          label: 'test',
          options: ['1', '2'],
          value: '1',
          onChange: () => null
        },
        { showError: true, message: 'invalid' }
      );

      expect(shallow(inputBox)).toMatchSnapshot();
    });
  });
});
