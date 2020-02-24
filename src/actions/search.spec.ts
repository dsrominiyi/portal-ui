import { customerSearchFetchSuggestions, abiSearchFetchResults } from './search';
import { SEARCH_CUSTOMER_FETCH_HITS, SEARCH_ABI_FETCH_HITS } from './actionTypes';

test('the customerSearchFetchSuggestions action returns an empty payload if no searchTerm is provided', () => {
  const actionResult = customerSearchFetchSuggestions('');
  expect(actionResult).toStrictEqual({
    type: SEARCH_CUSTOMER_FETCH_HITS,
    payload: undefined
  });
});

test('the customerSearchFetchSuggestions action triggers a query against the CloudSearch endpoint', done => {
  const searchTerm = 'test';
  (fetch as any).mockResponseOnce(JSON.stringify({ result: true }));
  const actionResult = customerSearchFetchSuggestions(searchTerm);

  actionResult.payload
    ? actionResult.payload.then((response: any) => {
        expect(response).toStrictEqual({ result: true });
        done();
      })
    : done.fail(new Error('Action did not contain a payload'));
});

test('the abiSearchFetchResults action returns an empty payload if no searchTerm is provided', () => {
  const actionResult = abiSearchFetchResults('', '403');
  expect(actionResult).toStrictEqual({
    type: SEARCH_ABI_FETCH_HITS,
    payload: undefined
  });
});

test('the abiSearchFetchResults action triggers a query against the CloudSearch endpoint', done => {
  const searchTerm = 'limited';
  (fetch as any).mockResponseOnce(JSON.stringify({ result: true }));
  const actionResult = abiSearchFetchResults(searchTerm, '403');

  actionResult.payload
    ? actionResult.payload.then((response: any) => {
        expect(response).toStrictEqual({ result: true });
        done();
      })
    : done.fail(new Error('Action did not contain a payload'));
});
