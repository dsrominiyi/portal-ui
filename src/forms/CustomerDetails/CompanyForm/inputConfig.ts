import { Props as TextFieldProps } from '../../../components/TextField';
import { Props as AbiSearchProps } from '../../../components/AbiSearch';
import { Props as MultiChoiceProps } from '../../../components/MultiChoice';
import { Props as DateFieldsProps } from '../../common/DateFields';

import { getKeyByValue } from '../../../helpers/utilFuncs';

const yesNoMap: { [key: string]: boolean } = { Yes: false, No: true };

const config = {
  companyName: (value: string, onChange: TextFieldProps['onChange']) => ({
    type: InputType.Text,
    label: 'Company Name',
    value,
    onChange,
    attributes: { 'test-id': 'company-name' }
  }),
  tradingName: (value: string | undefined, onChange: TextFieldProps['onChange']) => ({
    type: InputType.Text,
    label: 'Trading name (optional)',
    value,
    onChange,
    attributes: { 'test-id': 'trading-name' }
  }),
  businessClass: (onChange: AbiSearchProps['onChange']) => ({
    type: InputType.AbiSearch,
    label: 'Business class',
    codeListId: '11',
    onChange,
    attributes: { 'test-id': 'business-class' }
  }),
  tradingSinceDate: (value: DateFieldValues, onChange: DateFieldsProps['onChange']) => ({
    type: InputType.DateFields,
    label: 'Trading since date (optional)',
    value,
    onChange,
    attributes: { 'test-id': 'trading-since-date' }
  }),
  registeredCoNumber: (value: string, onChange: TextFieldProps['onChange']) => ({
    type: InputType.Text,
    label: 'Registration number',
    value,
    onChange,
    attributes: { 'test-id': 'registration-number' }
  }),
  parentCompany: (value: boolean | undefined, onChange: MultiChoiceProps['onClick']) => ({
    type: InputType.MultiChoice,
    label: 'Is this company a subsidiary?',
    options: ['Yes', 'No'],
    value: getKeyByValue(yesNoMap, value),
    onChange,
    attributes: { 'test-id': 'select-subsidiary-status' }
  }),
  parentCompanyName: (value: string | undefined, onChange: TextFieldProps['onChange']) => ({
    type: InputType.Text,
    label: "Please enter the parent company's name",
    value,
    onChange,
    attributes: { 'test-id': 'parent-company-name' }
  })
};

export default config;
