import { ActionType } from 'redux-promise-middleware';
import reducer, { initialState } from '.';
import {
  SEARCH_CUSTOMER_FETCH_HITS,
  SEARCH_ABI_FETCH_HITS
} from '../../actions/actionTypes';

describe('search reducer', () => {
  beforeEach(() => {
    (fetch as any).resetMocks();
  });
  it('returns the initial state by default', () => {
    const state = reducer(undefined, { type: 'TEST' });

    expect(state).toBe(initialState);
  });

  test('the SEARCH_CUSTOMER_FETCH_HITS_REJECTED action resets the suggestions to be empty', () => {
    const state = reducer(undefined, {
      type: `${SEARCH_CUSTOMER_FETCH_HITS}_${ActionType.Rejected}`
    });
    expect(state.suggestResults).toStrictEqual({ suggestions: [] });
  });

  test('the SEARCH_CUSTOMER_FETCH_HITS_PENDING action resets the suggestions to be empty', () => {
    const state = reducer(undefined, {
      type: `${SEARCH_CUSTOMER_FETCH_HITS}_${ActionType.Pending}`
    });
    expect(state.suggestResults).toStrictEqual({ suggestions: [] });
  });

  test('the SEARCH_CUSTOMER_FETCH_HITS action resets the suggestions to be empty', () => {
    const searchTerm = 'test';
    const state = reducer(undefined, {
      type: SEARCH_CUSTOMER_FETCH_HITS,
      payload: searchTerm
    });
    expect(state.suggestResults).toStrictEqual({ suggestions: [] });
  });

  test('the SEARCH_CUSTOMER_FETCH_HITS_FULFILLED action updates the suggestions', () => {
    const state = reducer(undefined, {
      type: `${SEARCH_CUSTOMER_FETCH_HITS}_${ActionType.Fulfilled}`,
      payload: {
        status: { rid: 'string' },
        suggest: {
          query: 'test',
          found: 2,
          suggestions: [{ id: 'string', score: 0, suggestion: 'Test User' }]
        }
      }
    });
    expect(state.suggestResults).toStrictEqual({
      query: 'test',
      found: 2,
      suggestions: [{ id: 'string', score: 0, suggestion: 'Test User' }]
    });
  });

  test('the SEARCH_ABI_FETCH_HITS_REJECTED action resets the suggestions to be empty', () => {
    const state = reducer(undefined, {
      type: `${SEARCH_ABI_FETCH_HITS}_${ActionType.Rejected}`
    });
    expect(state.hitResults).toStrictEqual({ hit: [] });
  });

  test('the SEARCH_ABI_FETCH_HITS_PENDING action resets the suggestions to be empty', () => {
    const state = reducer(undefined, {
      type: `${SEARCH_ABI_FETCH_HITS}_${ActionType.Pending}`
    });
    expect(state.hitResults).toStrictEqual({ hit: [] });
  });

  test('the SEARCH_ABI_FETCH_HITS action resets the suggestions to be empty', () => {
    const searchTerm = 'limit';
    const state = reducer(undefined, {
      type: SEARCH_ABI_FETCH_HITS,
      payload: searchTerm
    });
    expect(state.hitResults).toStrictEqual({ hit: [] });
  });

  test('the SEARCH_ABI_FETCH_HITS_FULFILLED action updates the suggestions', () => {
    const state = reducer(undefined, {
      type: `${SEARCH_ABI_FETCH_HITS}_${ActionType.Fulfilled}`,
      payload: {
        status: { rid: 'string' },
        hits: {
          query: 'limit',
          found: 1,
          // eslint-disable-next-line @typescript-eslint/camelcase
          hit: [{ description: 'description', netval: '001', codelist_id: '403' }]
        }
      }
    });
    expect(state.hitResults).toStrictEqual({
      query: 'limit',
      found: 1,
      // eslint-disable-next-line @typescript-eslint/camelcase
      hit: [{ description: 'description', netval: '001', codelist_id: '403' }]
    });
  });
});
