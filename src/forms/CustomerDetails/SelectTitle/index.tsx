import React, { FunctionComponent, Fragment } from 'react';

import QuestionBox from '../../../components/QuestionBox';
import Dropdown from '../../../components/Dropdown';
import MultiChoice from '../../../components/MultiChoice';
import SubQuestion from '../../../components/SubQuestion';

import { otherTitleOptions } from '../../../helpers/optionLists';

export interface Props {
  title?: string;
  hasError?: boolean;
  onChange(value: string): void;
}

const titleList = ['Mr', 'Mrs', 'Miss', 'Ms', 'Other'];
const standardTitles = [...titleList];
const titleOther = standardTitles.pop(); // intentionally remove 'Other' from standardTitles

export const SelectTitle: FunctionComponent<Props> = ({
  title = '',
  hasError,
  onChange
}: Props) => (
  <Fragment>
    <QuestionBox
      text="Title"
      hasError={hasError}
      errorText="Please confirm title"
      inputFields={[
        <MultiChoice
          key="0"
          options={titleList}
          selectedOption={!title || standardTitles.includes(title) ? title : titleOther}
          onClick={option => onChange(option)}
          attributes={{ 'test-id': 'select-standard-title' }}
        />
      ]}
    />
    <SubQuestion
      visible={!!title && !standardTitles.includes(title)}
      items={[
        <QuestionBox
          key="0"
          hasError={hasError}
          inputFields={[
            <Dropdown
              key="0"
              label="Please select title"
              options={otherTitleOptions}
              selected={otherTitleOptions.includes(title) ? title : undefined}
              onChange={value => onChange(String(value))}
              attributes={{ 'test-id': 'select-alternative-title' }}
            />
          ]}
        />
      ]}
    />
  </Fragment>
);

SelectTitle.displayName = 'SelectTitle';
export default SelectTitle;
