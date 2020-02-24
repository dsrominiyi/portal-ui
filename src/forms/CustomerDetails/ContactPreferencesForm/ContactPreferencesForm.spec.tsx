import React from 'react';
import { shallow, mount, ShallowWrapper, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';

import ContactPreferencesForm from '.';

let form: ShallowWrapper | ReactWrapper;
const onChange = jest.fn();

const getField = (fieldIndex: number) => {
  return (form
    .find('QuestionBox')
    .at(fieldIndex)
    .props() as any).inputFields[0];
};

describe('ContactPreferencesForm', () => {
  const contactDetails = [
    { type: ContactType.HomeNumber, detail: '02079460111' },
    { type: ContactType.PersonalEmail, detail: 'test@example.com' },
    { type: ContactType.MobileNumber, detail: '02079460111' }
  ];
  beforeEach(() => {
    jest.clearAllMocks();
    form = shallow(<ContactPreferencesForm onChange={onChange} contactDetails={contactDetails} />);
  });

  test('ContactPreferencesForm matches snapshot', () => {
    expect(form).toMatchSnapshot();
  });

  test('selecting a marketing consent type updates the marketingConsentType state value', () => {
    const option = 'Email';
    let consentMultiChoice = getField(0);
    consentMultiChoice.props.onClick(option);
    consentMultiChoice = getField(0);

    expect(consentMultiChoice.props.selectedOption).toBe(option);
  });

  test('selecting a marketing contact method updates the marketingContactMethods state value', () => {
    const option = 'Email';
    const option2 = 'Phone';
    let marketingContactMultiChoice = getField(1);
    marketingContactMultiChoice.props.onClick(option);
    marketingContactMultiChoice = getField(1);

    expect(marketingContactMultiChoice.props.selectedOptions).toEqual([option]);

    marketingContactMultiChoice.props.onClick(option2);
    marketingContactMultiChoice = getField(1);

    expect(marketingContactMultiChoice.props.selectedOptions).toEqual([option, option2]);

    marketingContactMultiChoice.props.onClick(option);
    marketingContactMultiChoice = getField(1);

    expect(marketingContactMultiChoice.props.selectedOptions).toEqual([option2]);
  });

  test('selecting a non-marketing contact method updates the noMarketingContactMethods state value', () => {
    const option = 'Email';
    const option2 = 'Phone';
    const marketingPreferenceConsentType = getField(0);
    marketingPreferenceConsentType.props.onClick(option2);

    let nonMarketingContactMultiChoice = getField(1);
    nonMarketingContactMultiChoice.props.onClick(option);
    nonMarketingContactMultiChoice = getField(1);

    expect(nonMarketingContactMultiChoice.props.selectedOptions).toEqual([option]);

    nonMarketingContactMultiChoice.props.onClick(option2);
    nonMarketingContactMultiChoice = getField(1);

    expect(nonMarketingContactMultiChoice.props.selectedOptions).toEqual([option, option2]);

    nonMarketingContactMultiChoice.props.onClick(option);
    nonMarketingContactMultiChoice = getField(1);

    expect(nonMarketingContactMultiChoice.props.selectedOptions).toEqual([option2]);
  });

  test('selecting a referred by option updates the referredBy state value', () => {
    const value = 'Recommended';
    let referredByDropdown = getField(2);

    referredByDropdown.props.onChange(value);
    referredByDropdown = getField(2);

    expect(referredByDropdown.props.selected).toBe(value);
  });

  test('onChange is called with the form state when any field is updated', () => {
    form = mount(<ContactPreferencesForm onChange={onChange} contactDetails={contactDetails} />);

    const marketingConsentType = ContactMethod.Email;
    const consentMultiChoice = getField(0);

    act(() => {
      consentMultiChoice.props.onClick(marketingConsentType);
    });
    form.update();

    expect(onChange).toHaveBeenCalledWith({
      marketingConsentType,
      marketingContactMethods: [
        ContactMethod.TextMessage,
        ContactMethod.Phone,
        ContactMethod.Email,
        ContactMethod.Post
      ],
      nonMarketingContactMethods: [
        ContactMethod.TextMessage,
        ContactMethod.Phone,
        ContactMethod.Email,
        ContactMethod.Post
      ],
      referredBy: ''
    });

    form.update();
    const marketingContactMethod = ContactMethod.Post;
    const marketingContactMultiChoice = getField(1);

    act(() => {
      marketingContactMultiChoice.props.onClick(marketingContactMethod);
    });

    expect(onChange).toHaveBeenCalledWith({
      marketingConsentType,
      marketingContactMethods: [
        ContactMethod.TextMessage,
        ContactMethod.Phone,
        ContactMethod.Email
      ],
      nonMarketingContactMethods: [
        ContactMethod.TextMessage,
        ContactMethod.Phone,
        ContactMethod.Email,
        ContactMethod.Post
      ],
      referredBy: ''
    });

    form.update();
    const nonMarketingContactMethod = ContactMethod.TextMessage;
    const nonMarketingContactMultiChoice = getField(2);

    act(() => {
      nonMarketingContactMultiChoice.props.onClick(nonMarketingContactMethod);
    });

    expect(onChange).toHaveBeenCalledWith({
      marketingConsentType,
      marketingContactMethods: [
        ContactMethod.TextMessage,
        ContactMethod.Phone,
        ContactMethod.Email
      ],
      nonMarketingContactMethods: [ContactMethod.Phone, ContactMethod.Email, ContactMethod.Post],
      referredBy: ''
    });

    form.update();
    const referredBy = 'Recommended';
    const referredByDropdown = getField(3);

    act(() => {
      referredByDropdown.props.onChange(referredBy);
    });

    expect(onChange).toHaveBeenCalledWith({
      marketingConsentType,
      marketingContactMethods: [
        ContactMethod.TextMessage,
        ContactMethod.Phone,
        ContactMethod.Email
      ],
      nonMarketingContactMethods: [ContactMethod.Phone, ContactMethod.Email, ContactMethod.Post],
      referredBy
    });
  });

  test('Check "Marketing contact methods" QuestionBox disabled status when contact details is empty', () => {
    form = mount(<ContactPreferencesForm onChange={onChange} contactDetails={[]} />);
    const marketingConsentType = getField(0);

    act(() => {
      marketingConsentType.props.onClick(MarketingConsentType.Phone);
    });
    form.update();

    const marketingContactMethods = getField(1);

    expect(marketingContactMethods.props.disabledOptions).toContain(ContactMethod.Phone);
    expect(marketingContactMethods.props.disabledOptions).toContain(ContactMethod.Email);
    expect(marketingContactMethods.props.disabledOptions).toContain(ContactMethod.TextMessage);
  });

  test('Check "Marketing contact methods" QuestionBox disabled status when contact details has a mobile number', () => {
    form = mount(
      <ContactPreferencesForm onChange={onChange} contactDetails={[contactDetails[2]]} />
    );
    const marketingConsentType = getField(0);

    act(() => {
      marketingConsentType.props.onClick(MarketingConsentType.Phone);
    });
    form.update();

    const marketingContactMethods = getField(1);

    expect(marketingContactMethods.props.disabledOptions).toContainEqual(ContactMethod.Email);
  });

  test('Check "Marketing contact methods" QuestionBox disabled status when contact details has a email address and home phone number', () => {
    const contactDetailsWithPhoneAddress = [contactDetails[0], contactDetails[1]];
    form = mount(
      <ContactPreferencesForm onChange={onChange} contactDetails={contactDetailsWithPhoneAddress} />
    );
    const marketingConsentType = getField(0);

    act(() => {
      marketingConsentType.props.onClick(MarketingConsentType.Phone);
    });
    form.update();

    const marketingContactMethods = getField(1);

    expect(marketingContactMethods.props.disabledOptions).toContain(ContactMethod.TextMessage);
  });

  test('Reset marketingContactMethods state when user select Unsubscribe option (hide the Marketing contact methods)', () => {
    const contactDetailsWithPhoneAddress = [contactDetails[0], contactDetails[1]];
    form = mount(
      <ContactPreferencesForm onChange={onChange} contactDetails={contactDetailsWithPhoneAddress} />
    );
    const marketingConsentType = getField(0);

    act(() => {
      marketingConsentType.props.onClick(MarketingConsentType.Phone);
    });
    form.update();

    const marketingContactMethods = getField(1);

    act(() => {
      marketingContactMethods.props.onClick(ContactMethod.Phone);
      marketingConsentType.props.onClick(MarketingConsentType.Unsubscribe);
    });
    form.update();

    const nonMarketingContactMethods = getField(1);

    expect(nonMarketingContactMethods.props.selectedOptions.length).toEqual(3);
  });

  test('Hide Marketing preferences when Unsubscribe, or Legitimate Interest option selected', () => {
    form = mount(<ContactPreferencesForm onChange={onChange} contactDetails={[]} />);
    const marketingConsentType = getField(0);
    const marketingContactMethodsTestId = { 'test-id': 'select-marketing-contact-method' };

    expect(marketingConsentType.props.selectedOption).toBe(MarketingConsentType.LegitimateInterest);
    expect(form.find(marketingContactMethodsTestId).length).toEqual(0);

    act(() => {
      marketingConsentType.props.onClick(MarketingConsentType.Unsubscribe);
    });
    form.update();

    expect(form.find(marketingContactMethodsTestId).length).toEqual(0);

    act(() => {
      marketingConsentType.props.onClick(MarketingConsentType.Email);
    });
    form.update();
    expect(form.find(marketingContactMethodsTestId).length).toEqual(1);
  });
});
