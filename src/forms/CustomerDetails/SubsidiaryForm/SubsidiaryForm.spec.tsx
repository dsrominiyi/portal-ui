import React from 'react';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import { shallow, mount, ShallowWrapper, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';

import SubsidiaryForm from '.';

import { buildCompanyFromFormData } from '../../../helpers/customerHelper';
import { isFormValid, buildErrors } from '../../../helpers/formValidator';

const mockStore = createMockStore([]);

jest.mock('../../../helpers/formValidator');
jest.useFakeTimers();

let form: ShallowWrapper | ReactWrapper;
const onChange = jest.fn();
const onSubmit = jest.fn();
(buildErrors as jest.Mock).mockReturnValue({
  companyName: {},
  tradingName: {},
  typeStatus: {},
  businessClass: {},
  tradingSinceDate: {},
  registeredCoNumber: {},
  contactDetails: {},
  addresses: {}
});

describe('SubsidiaryForm', () => {
  describe('snapshots', () => {
    beforeEach(() => {
      form = shallow(<SubsidiaryForm onChange={onChange} onSubmit={onSubmit} />);
    });

    test('SubsidiaryForm matches snapshot', () => {
      expect(form).toMatchSnapshot();
    });

    test('SubsidiaryForm with initial values matches snapshot', () => {
      (form as ShallowWrapper).setProps({
        initialValues: { companyName: 'Datamatters' }
      });

      expect(form).toMatchSnapshot();
    });

    test('SubsidiaryForm without form errors matches snapshot', () => {
      (buildErrors as jest.Mock).mockReturnValueOnce({});
      form = shallow(<SubsidiaryForm onChange={onChange} onSubmit={onSubmit} />);

      expect(form).toMatchSnapshot();
    });
  });

  describe('functionality', () => {
    const hitEnter = () => {
      act(() => {
        (form
          .find('div')
          .at(0)
          .props() as any).onKeyUp({ key: 'Enter' });
      });
      form.update();
    };

    const render = () => {
      form = mount(
        <Provider
          store={mockStore({
            search: {
              hitResults: [],
              suggestResults: []
            }
          })}
        >
          <SubsidiaryForm onChange={onChange} onSubmit={onSubmit} />
        </Provider>
      );
    };

    const runTimers = () => {
      act(() => {
        jest.runAllTimers();
      });
    };

    beforeEach(() => {
      runTimers();
      jest.clearAllMocks();
      (isFormValid as jest.Mock) = jest.fn(() => true);
      render();
    });

    test('onSubmit is called when the Enter is pressed', () => {
      hitEnter();

      expect(onSubmit).toHaveBeenCalled();
    });

    test('onSubmit is not called when the Enter is pressed if the form is invalid', () => {
      (isFormValid as jest.Mock) = jest.fn(() => false);
      render();
      hitEnter();

      expect(onSubmit).not.toHaveBeenCalled();
    });

    test('ValidationErrorsNotification is rendered when the Enter is pressed but the form is invalid', () => {
      (isFormValid as jest.Mock) = jest.fn(() => false);
      hitEnter();

      expect(form.find('ValidationErrorsNotification').length).toBe(1);
    });

    test('onChange is called with the form state when any field is updated', () => {
      const companyName = 'Datamatters Ltd';

      act(() => {
        (form.find({ 'test-id': 'company-name' }).props() as any).onChange({
          target: { value: companyName }
        });
      });

      expect(onChange).toHaveBeenCalledWith(
        buildCompanyFromFormData({
          companyName,
          tradingName: '',
          typeStatus: undefined,
          businessClass: '',
          tradingSinceDate: { dd: '', mm: '', yyyy: '' },
          registeredCoNumber: '',
          parentCompany: false,
          parentCompanyName: '',
          contactDetails: [],
          additionalContacts: [],
          addresses: []
        }),
        true
      );

      form.update();
      runTimers();

      const tradingName = 'Datamatters';

      act(() => {
        (form.find({ 'test-id': 'trading-name' }).props() as any).onChange({
          target: { value: tradingName }
        });
      });

      expect(onChange).toHaveBeenCalledWith(
        buildCompanyFromFormData({
          companyName,
          tradingName,
          typeStatus: undefined,
          businessClass: '',
          tradingSinceDate: { dd: '', mm: '', yyyy: '' },
          registeredCoNumber: '',
          parentCompany: false,
          parentCompanyName: '',
          contactDetails: [],
          additionalContacts: [],
          addresses: []
        }),
        true
      );

      form.update();
      runTimers();

      const typeStatus = CompanyTypeStatus.Limited;

      act(() => {
        (form.find('SelectCompanyTypeStatus').props() as any).onChange(typeStatus);
      });

      expect(onChange).toHaveBeenCalledWith(
        buildCompanyFromFormData({
          companyName,
          tradingName,
          typeStatus,
          businessClass: '',
          tradingSinceDate: { dd: '', mm: '', yyyy: '' },
          registeredCoNumber: '',
          parentCompany: false,
          parentCompanyName: '',
          contactDetails: [],
          additionalContacts: [],
          addresses: []
        }),
        true
      );

      form.update();
      runTimers();

      const businessClass = 'Accountancy';

      act(() => {
        (form.find('AbiSearch').props() as any).onChange(businessClass);
      });

      expect(onChange).toHaveBeenCalledWith(
        buildCompanyFromFormData({
          companyName,
          tradingName,
          typeStatus,
          businessClass,
          tradingSinceDate: { dd: '', mm: '', yyyy: '' },
          registeredCoNumber: '',
          parentCompany: false,
          parentCompanyName: '',
          contactDetails: [],
          additionalContacts: [],
          addresses: []
        }),
        true
      );

      form.update();
      runTimers();

      const tradingSinceDate = { dd: '22', mm: '06', yyyy: '1980' };

      act(() => {
        (form.find('DateFields').props() as any).onChange(tradingSinceDate);
      });

      expect(onChange).toHaveBeenCalledWith(
        buildCompanyFromFormData({
          companyName,
          tradingName,
          typeStatus,
          businessClass,
          tradingSinceDate,
          registeredCoNumber: '',
          parentCompany: false,
          parentCompanyName: '',
          contactDetails: [],
          additionalContacts: [],
          addresses: []
        }),
        true
      );

      form.update();
      runTimers();

      const registeredCoNumber = '12345678';

      act(() => {
        (form.find({ 'test-id': 'registration-number' }).props() as any).onChange({
          target: { value: registeredCoNumber }
        });
      });

      expect(onChange).toHaveBeenCalledWith(
        buildCompanyFromFormData({
          companyName,
          tradingName,
          typeStatus,
          businessClass,
          tradingSinceDate,
          registeredCoNumber,
          parentCompany: false,
          parentCompanyName: '',
          contactDetails: [],
          additionalContacts: [],
          addresses: []
        }),
        true
      );

      form.update();
      runTimers();

      const contactDetails = [{}, {}] as Contact[];

      act(() => {
        (form
          .find('AddContactDetailsField')
          .at(0)
          .props() as any).onChange(contactDetails);
      });

      expect(onChange).toHaveBeenCalledWith(
        buildCompanyFromFormData({
          companyName,
          tradingName,
          typeStatus,
          businessClass,
          tradingSinceDate,
          registeredCoNumber,
          parentCompany: false,
          parentCompanyName: '',
          contactDetails,
          additionalContacts: [],
          addresses: []
        }),
        true
      );

      form.update();
      runTimers();

      const additionalContacts = [{}, {}] as AdditionalContact[];

      act(() => {
        (form.find('AddAdditionalContactsField').props() as any).onChange(additionalContacts);
      });

      expect(onChange).toHaveBeenCalledWith(
        buildCompanyFromFormData({
          companyName,
          tradingName,
          typeStatus,
          businessClass,
          tradingSinceDate,
          registeredCoNumber,
          parentCompany: false,
          parentCompanyName: '',
          contactDetails,
          additionalContacts,
          addresses: []
        }),
        true
      );
    });
  });
});
