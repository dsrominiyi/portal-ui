import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import InfoBox from '../../../components/InfoBox';
import PageTitle from '../../../components/PageTitle';
import SubQuestion from '../../../components/SubQuestion';

import ContactPreferencesForm from '../../../forms/CustomerDetails/ContactPreferencesForm';
import SelectCompanyTypeStatus from '../../../forms/CustomerDetails/SelectCompanyTypeStatus';
import AddSubsidiariesField from '../../../forms/CustomerDetails/AddItemsField/AddSubsidiariesField';
import AddContactDetailsField from '../../../forms/CustomerDetails/AddItemsField/AddContactDetailsField';
import AddAdditionalContactsField from '../../../forms/CustomerDetails/AddItemsField/AddAdditionalContactsField';
import AddAddressesField from '../../../forms/CustomerDetails/AddItemsField/AddAddressesField';

import { buildInput } from '../../../helpers/formHelper';
import inputConfig from '../../../forms/CustomerDetails/CompanyForm/inputConfig';

import { pageContainer } from '../../../style/global.scss';
import formStyles from '../../../forms/styles.scss';

export interface Props {}

export interface State {
  data: NewCompanyData;
}

type DataField = keyof NewCompanyData;

export class NewCompany extends Component {
  public state: State = {
    data: {
      companyName: '',
      tradingName: '',
      typeStatus: undefined,
      businessClass: '',
      tradingSinceDate: { dd: '', mm: '', yyyy: '' },
      parentCompany: undefined,
      parentCompanyName: '',
      registeredCoNumber: '',
      subsidiaries: [],
      contactDetails: [],
      additionalContacts: [],
      addresses: [],
      contactPreferences: {} as ContactPreferences
    }
  };

  public yesNoMap: { [key: string]: boolean } = { Yes: false, No: true };

  public componentDidUpdate(_prevProps: Props, prevState: State) {
    const {
      data: { subsidiaries: prevSubsidiaries, companyName: prevCompanyName }
    } = prevState;
    const {
      data: { subsidiaries, companyName }
    } = this.state;

    const shouldUpdateSubsidiaresParentCompanyName =
      prevCompanyName !== companyName || prevSubsidiaries!.length !== subsidiaries!.length;

    if (shouldUpdateSubsidiaresParentCompanyName) {
      const updatedSubsidiaries = subsidiaries!.map(subsidiary => ({
        ...subsidiary,
        parentCompanyName: companyName
      }));

      this.setData('subsidiaries', updatedSubsidiaries);
    }
  }

  private setData = (field: DataField, value: NewCompanyData[DataField], callback?: () => void) => {
    const { data } = this.state;
    this.setState({ data: { ...data, [field]: value } }, callback);
  };

  public render() {
    const {
      data: {
        companyName,
        contactDetails,
        tradingName,
        typeStatus,
        tradingSinceDate,
        parentCompany,
        parentCompanyName,
        registeredCoNumber,
        addresses
      }
    } = this.state;

    const formContent = (
      <Fragment key="0">
        <div className={formStyles.formSection} test-id="new-company-details">
          <h3>Company Details</h3>
          {buildInput(
            inputConfig.companyName(companyName, event => {
              this.setData('companyName', event.target.value);
            })
          )}
          {buildInput(
            inputConfig.tradingName(tradingName, event => {
              this.setData('tradingName', event.target.value);
            })
          )}
          <SelectCompanyTypeStatus
            typeStatus={typeStatus}
            onChange={value => this.setData('typeStatus', value)}
          />
          {buildInput(
            inputConfig.businessClass((value: string) => {
              this.setData('businessClass', value);
            })
          )}
          {buildInput(
            inputConfig.tradingSinceDate(tradingSinceDate, tradingDate => {
              this.setData('tradingSinceDate', tradingDate);
            })
          )}
          {buildInput(
            inputConfig.registeredCoNumber(registeredCoNumber, event => {
              this.setData('registeredCoNumber', event.target.value);
            })
          )}
          {buildInput(
            inputConfig.parentCompany(parentCompany, option => {
              this.setData(
                'parentCompany',
                this.yesNoMap[option],
                option === 'No' ? () => this.setData('subsidiaries', []) : undefined
              );
            })
          )}
          <SubQuestion
            visible={parentCompany === true}
            items={[
              <AddSubsidiariesField
                key="0"
                onChange={values => this.setData('subsidiaries', values)}
              />
            ]}
          />
          <SubQuestion
            visible={parentCompany === false}
            items={[
              buildInput(
                inputConfig.parentCompanyName(parentCompanyName, event => {
                  this.setData('parentCompanyName', event.target.value);
                })
              )
            ]}
          />
          <AddContactDetailsField onChange={values => this.setData('contactDetails', values)} />
          <AddAdditionalContactsField
            onChange={values => this.setData('additionalContacts', values)}
          />
        </div>
        <div className={formStyles.formSection} test-id="new-company-address-details">
          <h3>Address Details</h3>
          <AddAddressesField
            customerType="Company"
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
        <PageTitle text="New Company" />
        <InfoBox items={[formContent]} />
      </div>
    );
  }
}

const mapStateToProps = (_state: CombinedState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(NewCompany);
