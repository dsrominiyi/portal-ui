import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import PageTitle from '../../../components/PageTitle';
import InfoBox from '../../../components/InfoBox';
import QuestionBox from '../../../components/QuestionBox';
import Dropdown from '../../../components/Dropdown';
import MultiChoice from '../../../components/MultiChoice';
import SubQuestion from '../../../components/SubQuestion';

import DateFields from '../../../forms/common/DateFields';
import SelectTitle from '../../../forms/CustomerDetails/SelectTitle';
import NameFields from '../../../forms/CustomerDetails/NameFields';
import ContactPreferencesForm from '../../../forms/CustomerDetails/ContactPreferencesForm';
import AddContactDetailsField from '../../../forms/CustomerDetails/AddItemsField/AddContactDetailsField';
import AddAdditionalContactsField from '../../../forms/CustomerDetails/AddItemsField/AddAdditionalContactsField';
import AddAddressesField from '../../../forms/CustomerDetails/AddItemsField/AddAddressesField';

import { maritalStatusOptions } from '../../../helpers/optionLists';
import { getKeyByValue } from '../../../helpers/utilFuncs';

import { pageContainer } from '../../../style/global.scss';
import formStyles from '../../../forms/styles.scss';

export interface Props {}

export interface State {
  data: {
    name: IndividualName;
    sex: Sex;
    dateOfBirth: DateFieldValues;
    residentSinceBirth?: boolean;
    residencyDate: DateFieldValues;
    maritalStatus: MaritalStatus;
    contactDetails: Contact[];
    additionalContacts: AdditionalContact[];
    homeowner?: boolean;
    contactPreferences: ContactPreferences;
    addresses: Address[];
  };
}

type DataField = keyof State['data'];

export class NewIndividual extends Component<Props> {
  public state: State = {
    data: {
      name: {
        title: '',
        forename: '',
        middleName: '',
        surname: ''
      },
      sex: '' as Sex,
      dateOfBirth: { dd: '', mm: '', yyyy: '' },
      residentSinceBirth: undefined,
      residencyDate: { dd: '', mm: '', yyyy: '' },
      maritalStatus: '' as MaritalStatus,
      contactDetails: [],
      additionalContacts: [],
      homeowner: undefined,
      contactPreferences: {} as ContactPreferences,
      addresses: [] as Address[]
    }
  };

  public genderList: Sex[] = ['Male', 'Female', 'Not Specified'];

  public yesNoMap: { [key: string]: boolean } = { Yes: true, No: false };

  private setData = (field: DataField, value: State['data'][DataField]) => {
    const { data } = this.state;
    this.setState({ data: { ...data, [field]: value } });
  };

  public render() {
    const {
      data: {
        name,
        sex,
        contactDetails,
        dateOfBirth,
        residentSinceBirth,
        residencyDate,
        maritalStatus,
        homeowner,
        addresses
      }
    } = this.state;
    const { title, forename, middleName, surname } = name;

    const formContent = (
      <Fragment key="0">
        <div className={formStyles.formSection} test-id="new-individual-details">
          <h3>Customer Details</h3>
          <SelectTitle
            title={title}
            onChange={value => this.setData('name', { ...name, title: value })}
          />
          <NameFields
            forename={forename}
            middleName={middleName || ''}
            surname={surname}
            onChange={values => this.setData('name', { ...values, title })}
          />
          <QuestionBox
            text="Gender"
            inputFields={[
              <MultiChoice
                key="0"
                options={this.genderList}
                selectedOption={sex}
                onClick={option => this.setData('sex', option as Sex)}
                attributes={{ 'test-id': 'select-gender' }}
              />
            ]}
          />
          <QuestionBox
            text="Date of birth"
            inputFields={[
              <DateFields
                key="0"
                values={dateOfBirth}
                onChange={dob => {
                  this.setData('dateOfBirth', dob);
                }}
                testId="date-of-birth"
              />
            ]}
          />
          <QuestionBox
            text="Resident Since Birth"
            inputFields={[
              <MultiChoice
                key="0"
                options={['Yes', 'No']}
                selectedOption={getKeyByValue(this.yesNoMap, residentSinceBirth)}
                onClick={option => {
                  this.setData('residentSinceBirth', this.yesNoMap[option]);
                }}
                attributes={{ 'test-id': 'select-resident-since-birth' }}
              />
            ]}
          />
          <SubQuestion
            visible={residentSinceBirth === false}
            items={[
              <QuestionBox
                key="0"
                text="Residency date"
                inputFields={[
                  <DateFields
                    key="0"
                    values={residencyDate}
                    onChange={resDate => {
                      this.setData('residencyDate', resDate);
                    }}
                    testId="residency-date"
                  />
                ]}
              />
            ]}
          />
          <QuestionBox
            inputFields={[
              <Dropdown
                key="0"
                label="Marital status"
                options={maritalStatusOptions}
                selected={maritalStatus}
                onChange={value => this.setData('maritalStatus', value as MaritalStatus)}
                attributes={{ 'test-id': 'select-marital-status' }}
              />
            ]}
          />
          <AddContactDetailsField onChange={values => this.setData('contactDetails', values)} />
          <AddAdditionalContactsField
            onChange={values => this.setData('additionalContacts', values)}
          />
          <QuestionBox
            text="Homeowner"
            inputFields={[
              <MultiChoice
                key="0"
                options={['Yes', 'No']}
                selectedOption={getKeyByValue(this.yesNoMap, homeowner)}
                onClick={option => {
                  this.setData('homeowner', this.yesNoMap[option]);
                }}
                attributes={{ 'test-id': 'select-homeowner-status' }}
              />
            ]}
          />
        </div>
        <div className={formStyles.formSection} test-id="new-individual-address-details">
          <h3>Address Details</h3>
          <AddAddressesField
            customerType="Individual"
            addresses={addresses}
            onChange={values => this.setData('addresses', values)}
          />
        </div>
        <ContactPreferencesForm
          onChange={values => this.setData('contactPreferences', values)}
          contactDetails={contactDetails}
        />
      </Fragment>
    );

    return (
      <div className={pageContainer}>
        <PageTitle text="New Individual" />
        <InfoBox items={[formContent]} />
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(NewIndividual);
