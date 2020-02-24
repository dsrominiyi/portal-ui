import mockData from '../../../__mocks__/mock-data.json';

export const initialState: ReducerState = {
  customer: mockData.customers[0],
  quotes: mockData.quotes,
  policies: mockData.policies,
  contactHistory: mockData.contactHistory
};

export default (state = initialState) => state;
