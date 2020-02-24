import { ActionType } from 'redux-promise-middleware';
import {
  SEARCH_CUSTOMER_FETCH_HITS,
  SEARCH_ABI_FETCH_HITS
} from '../../actions/actionTypes';

export const initialState: ReducerState = {
  customerSearchResults: { hit: [] },
  abiSearchResults: { hit: [] }
};

const actionHandler: ActionHandler = {
  // SEARCH_CUSTOMER_FETCH_HITS

  [`${SEARCH_CUSTOMER_FETCH_HITS}_${ActionType.Pending}`]: (state: ReducerState) => ({
    ...state
  }),
  [`${SEARCH_CUSTOMER_FETCH_HITS}_${ActionType.Fulfilled}`]: (
    state: ReducerState,
    { payload }: Action
  ) => ({
    ...state,
    customerSearchResults: (payload as SearchHitListResponse).hits
  }),
  [`${SEARCH_CUSTOMER_FETCH_HITS}_${ActionType.Rejected}`]: (state: ReducerState) => ({
    ...state,
    customerSearchResults: { ...initialState.customerSearchResults }
  }),
  // on empty string
  SEARCH_CUSTOMER_FETCH_HITS: (state: ReducerState) => ({
    ...state,
    customerSearchResults: { ...initialState.customerSearchResults }
  }),

  // SEARCH_ABI_FETCH_HITS

  [`${SEARCH_ABI_FETCH_HITS}_${ActionType.Pending}`]: (state: ReducerState) => ({
    ...state
  }),
  [`${SEARCH_ABI_FETCH_HITS}_${ActionType.Fulfilled}`]: (
    state: ReducerState,
    { payload }: Action
  ) => ({
    ...state,
    abiSearchResults: (payload as SearchHitListResponse).hits
  }),
  [`${SEARCH_ABI_FETCH_HITS}_${ActionType.Rejected}`]: (state: ReducerState) => ({
    ...state,
    abiSearchResults: { ...initialState.abiSearchResults }
  }),
  // on empty string
  SEARCH_ABI_FETCH_HITS: (state: ReducerState) => ({
    ...state,
    abiSearchResults: { ...initialState.abiSearchResults }
  })
};

export default (state = initialState, action: Action) => {
  return actionHandler[action.type] ? actionHandler[action.type](state, action) : state;
};
