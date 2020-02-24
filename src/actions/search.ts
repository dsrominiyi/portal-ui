import { SEARCH_CUSTOMER_FETCH_HITS, SEARCH_ABI_FETCH_HITS } from './actionTypes';

const searchUrl = {
  customer: 'https://c86flyhe3i.execute-api.eu-west-1.amazonaws.com/dev/search',
  abiCodes: 'https://ssy2s4rqpl.execute-api.eu-west-1.amazonaws.com/dev/search'
};

export const customerSearchFetchResults = (searchTerm: string) => ({
  type: SEARCH_CUSTOMER_FETCH_HITS,
  payload: searchTerm
    ? fetch(`${searchUrl.customer}?q=${searchTerm}`).then((response: Response) => {
        return response.json();
      })
    : undefined
});

export const abiSearchFetchResults = (searchTerm: string, codeListId: string) => ({
  type: SEARCH_ABI_FETCH_HITS,
  payload: searchTerm
    ? fetch(
        `${searchUrl.abiCodes}?q.parser=structured&q=(and+(term+field%3Dcodelist_id+'${codeListId}')(prefix field%3Ddescription '${searchTerm}'))`
      ).then((response: Response) => response.json())
    : undefined
});
