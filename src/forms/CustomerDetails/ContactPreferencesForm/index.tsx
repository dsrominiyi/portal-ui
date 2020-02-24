import React, { FunctionComponent, useState, useEffect } from 'react';

import QuestionBox from '../../../components/QuestionBox';
import MultiChoice, { updateSelectedOptions } from '../../../components/MultiChoice';
import Dropdown from '../../../components/Dropdown';

import {
  consentTypeOptions,
  contactMethodOptions,
  referredByOptions
} from '../../../helpers/optionLists';

import formStyles from '../../styles.scss';

interface Props {
  contactDetails: Contact[];
  onChange(state: ContactPreferences): void;
}

type UseStateArray = [ContactPreferences, React.Dispatch<React.SetStateAction<ContactPreferences>>];

export const ContactPreferencesForm: FunctionComponent<Props> = ({
  onChange,
  contactDetails
}: Props) => {
  const [state, setState]: UseStateArray = useState({
    marketingConsentType: consentTypeOptions[0],
    marketingContactMethods: [] as ContactMethod[],
    nonMarketingContactMethods: [] as ContactMethod[],
    referredBy: ''
  });

  useEffect(() => {
    onChange(state);
  }, [state.marketingContactMethods, state.nonMarketingContactMethods, state.referredBy]);

  const update = (field: string, value: string | string[]) => {
    setState({ ...state, [field]: value });
  };

  const createDisabledOptionsValue = (): Array<string> => {
    const disabledContacts = new Set([
      ContactMethod.Email,
      ContactMethod.Phone,
      ContactMethod.TextMessage
    ]);

    contactDetails.forEach(contact => {
      if (
        [ContactType.HomeNumber, ContactType.WorkNumber, ContactType.MobileNumber].includes(
          contact.type
        )
      ) {
        if (ContactType.MobileNumber === contact.type) {
          disabledContacts.delete(ContactMethod.TextMessage);
        }
        disabledContacts.delete(ContactMethod.Phone);
      }

      if ([ContactType.WorkEmail, ContactType.PersonalEmail].includes(contact.type)) {
        disabledContacts.delete(ContactMethod.Email);
      }
    });

    return Array.from(disabledContacts);
  };

  useEffect(() => {
    setState({
      ...state,
      marketingContactMethods: contactMethodOptions.filter(
        item => !createDisabledOptionsValue().includes(item)
      ),
      nonMarketingContactMethods: contactMethodOptions.filter(
        item => !createDisabledOptionsValue().includes(item)
      )
    });
    onChange(state);
  }, [state.marketingConsentType, contactDetails]);

  const checkContactMethod = (): boolean => {
    if (
      state.marketingConsentType === MarketingConsentType.Unsubscribe ||
      state.marketingConsentType === MarketingConsentType.LegitimateInterest
    ) {
      if (state.marketingContactMethods.length !== 0) update('marketingContactMethods', []);

      return false;
    }
    return true;
  };

  return (
    <div className={formStyles.formSection}>
      <h3>Marketing/Contact Preferences</h3>
      <QuestionBox
        text="Marketing preference consent type"
        inputFields={[
          <MultiChoice
            key="0"
            options={consentTypeOptions}
            selectedOption={state.marketingConsentType}
            onClick={option => update('marketingConsentType', option)}
            disabledOptions={
              state.marketingConsentType !== consentTypeOptions[0] ? [consentTypeOptions[0]] : []
            }
            attributes={{ 'test-id': 'select-marketing-consent-type' }}
          />
        ]}
      />
      {checkContactMethod() && (
        <QuestionBox
          text="Marketing contact methods"
          inputFields={[
            <MultiChoice
              key="0"
              multiSelect
              options={contactMethodOptions}
              disabledOptions={createDisabledOptionsValue()}
              selectedOptions={state.marketingContactMethods}
              onClick={option => {
                update(
                  'marketingContactMethods',
                  updateSelectedOptions(state.marketingContactMethods, option)
                );
              }}
              attributes={{ 'test-id': 'select-marketing-contact-method' }}
            />
          ]}
        />
      )}
      <QuestionBox
        text="Non marketing contact methods"
        inputFields={[
          <MultiChoice
            key="0"
            multiSelect
            options={contactMethodOptions}
            disabledOptions={createDisabledOptionsValue()}
            selectedOptions={state.nonMarketingContactMethods}
            onClick={option => {
              update(
                'nonMarketingContactMethods',
                updateSelectedOptions(state.nonMarketingContactMethods, option)
              );
            }}
            attributes={{ 'test-id': 'select-non-marketing-contact-method' }}
          />
        ]}
      />
      <QuestionBox
        inputFields={[
          <Dropdown
            key="0"
            label="Where did you hear about us?"
            options={referredByOptions}
            selected={state.referredBy}
            onChange={value => update('referredBy', String(value))}
            attributes={{ 'test-id': 'select-referred-by' }}
          />
        ]}
      />
    </div>
  );
};

ContactPreferencesForm.displayName = 'ContactPreferencesForm';
export default ContactPreferencesForm;
