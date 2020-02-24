import { dateFieldValuesToDateString, dateStringToDateFieldValues } from './utilFuncs';
import { buildCompanyFromFormData, buildFormDataFromCompany } from './customerHelper';

describe('customerHelper', () => {
  describe('buildCompanyFromFormData', () => {
    const formData = {
      companyName: 'Datamatters',
      contactDetails: [],
      addresses: [],
      tradingSinceDate: { dd: '02', mm: '03', yyyy: '1967' },
      registeredCoNumber: '12345678',
      businessClass: 'Insurance'
    };

    it('maps the form data to a company object', () => {
      const company = buildCompanyFromFormData(formData);

      expect(company).toEqual({
        ...formData,
        parentCompany: false,
        tradingSinceDate: dateFieldValuesToDateString(formData.tradingSinceDate)
      });
    });
  });

  describe('buildFormDataFromCompany', () => {
    const company = {
      companyName: 'Datamatters',
      contactDetails: [],
      addresses: [],
      tradingSinceDate: '1967-03-02',
      registeredCoNumber: '12345678',
      businessClass: 'Insurance',
      parentCompany: false
    };

    it('maps the form data to a company object', () => {
      const formData = buildFormDataFromCompany(company);

      expect(formData).toEqual({
        ...company,
        tradingSinceDate: dateStringToDateFieldValues(company.tradingSinceDate)
      });
    });

    it('initialises empty DateFieldValues for tradingSinceDate if it is not present', () => {
      const formData = buildFormDataFromCompany({ ...company, tradingSinceDate: undefined });

      expect(formData).toEqual({
        ...company,
        tradingSinceDate: { dd: '', mm: '', yyyy: '' }
      });
    });
  });
});
