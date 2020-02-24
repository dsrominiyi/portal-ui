import { dateFieldValuesToDateString, dateStringToDateFieldValues } from './utilFuncs';
import { predefinedRules, ValidationRules } from './formValidator';

export const companyFormValidationRules: ValidationRules = {
  companyName: { ...predefinedRules.entityName, fieldLabel: 'company name', required: true },
  tradingName: { ...predefinedRules.entityName, fieldLabel: 'trading name' },
  typeStatus: { fieldLabel: 'company legal status', invalidValues: ['Other'], required: true },
  businessClass: { fieldLabel: 'business class', required: true },
  tradingSinceDate: { fieldLabel: 'trading since', isDate: true },
  parentCompany: { fieldLabel: 'is this company a subsidiary', required: true },
  parentCompanyName: { ...predefinedRules.entityName, fieldLabel: 'parent company name' },
  registeredCoNumber: predefinedRules.registeredCoNumber,
  contactDetails: { fieldLabel: 'contact details', required: true },
  addresses: { fieldLabel: 'addresses', required: true }
};

export const isIndividualCustomer = (customer: Customer): customer is Individual => {
  return typeof (customer as Individual).name !== 'undefined';
};

export const getIndividualFullName = ({ title, forename, middleName, surname }: IndividualName) => {
  return `${title} ${forename}${middleName && ` ${middleName}`} ${surname}`;
};

export const buildCompanyFromFormData = (data: NewCompanyData): Company => ({
  ...data,
  parentCompany: data.parentCompany || false,
  tradingSinceDate: dateFieldValuesToDateString(data.tradingSinceDate)
});

export const buildFormDataFromCompany = (data: Company): NewCompanyData => ({
  ...data,
  tradingSinceDate: data.tradingSinceDate
    ? dateStringToDateFieldValues(data.tradingSinceDate)
    : { dd: '', mm: '', yyyy: '' }
});
