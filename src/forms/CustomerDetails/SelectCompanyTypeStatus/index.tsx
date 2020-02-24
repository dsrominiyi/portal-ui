import React, { FunctionComponent, Fragment } from 'react';

import QuestionBox from '../../../components/QuestionBox';
import Dropdown from '../../../components/Dropdown';
import MultiChoice from '../../../components/MultiChoice';
import SubQuestion from '../../../components/SubQuestion';

import {
  companyTypeStatusOptions,
  otherCompanyTypeStatusOptions
} from '../../../helpers/optionLists';

export interface Props {
  typeStatus?: CompanyTypeStatus;
  hasError?: boolean;
  onChange(value: CompanyTypeStatus): void;
}

const standardTypeStatuses = [...companyTypeStatusOptions];
const typeStatusOther = standardTypeStatuses.pop(); // intentionally remove 'Other' from standardTitles

export const SelectCompanyTypeStatus: FunctionComponent<Props> = ({
  typeStatus = '' as CompanyTypeStatus,
  hasError,
  onChange
}: Props) => (
  <Fragment>
    <QuestionBox
      hasError={hasError}
      errorText="Please confirm legal status"
      text="Company legal status"
      inputFields={[
        <MultiChoice
          key="0"
          options={companyTypeStatusOptions}
          selectedOption={
            !typeStatus || standardTypeStatuses.includes(typeStatus) ? typeStatus : typeStatusOther
          }
          onClick={(option: CompanyTypeStatus) => onChange(option)}
          attributes={{ 'test-id': 'select-standard-legal-status' }}
        />
      ]}
    />
    <SubQuestion
      visible={!!typeStatus && !standardTypeStatuses.includes(typeStatus)}
      items={[
        <QuestionBox
          key="0"
          hasError={hasError}
          inputFields={[
            <Dropdown
              key="0"
              label="Please select legal status"
              options={otherCompanyTypeStatusOptions}
              selected={otherCompanyTypeStatusOptions.includes(typeStatus) ? typeStatus : undefined}
              onChange={value => onChange(value as CompanyTypeStatus)}
              attributes={{ 'test-id': 'select-alternative-legal-status' }}
            />
          ]}
        />
      ]}
    />
  </Fragment>
);

SelectCompanyTypeStatus.displayName = 'SelectCompanyTypeStatus';
export default SelectCompanyTypeStatus;
