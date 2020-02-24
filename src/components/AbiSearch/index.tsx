import React, { FunctionComponent, MouseEvent, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SearchBar from '../SearchBar';
import TextField from '../TextField';
import { abiSearchFetchResults as searchFetchResultsAction } from '../../actions/search';

import styles from './styles.scss';
import formStyles from '../../forms/styles.scss';

export interface Props {
  label?: string;
  codeListId: string;
  attributes?: { [attr: string]: string };
  onChange(value: string): void;
}

export const AbiSearch: FunctionComponent<Props> = ({
  label,
  codeListId,
  attributes,
  onChange
}: Props) => {
  const [isResultSelected, setIsResultSelected] = useState(false);
  const [resultText, setResultText] = useState('');

  const dispatch = useDispatch();
  const {
    search: { abiSearchResults }
  } = useSelector((state: CombinedState) => ({
    search: state.search as SearchState
  }));

  const searchFetchResults = (searchTerm: string) => {
    return dispatch(searchFetchResultsAction(searchTerm, codeListId));
  };

  const onClickResult = (event: MouseEvent) => {
    const result = event.currentTarget.textContent || resultText;
    setResultText(result);
    setIsResultSelected(true);
    onChange(result);
  };

  const onFocus = () => {
    setIsResultSelected(false);
  };

  const testId = attributes && attributes['test-id'];

  return (
    <Fragment>
      <TextField
        key="1"
        value={resultText}
        label={label}
        additionalClasses={[formStyles.formTextField, !isResultSelected ? styles.hidden : '']}
        onChange={() => null}
        onFocus={onFocus}
        attributes={{ 'test-id': testId || '' }}
      />
      <SearchBar
        key="0"
        label={label}
        searchResults={abiSearchResults}
        searchFetchResults={searchFetchResults}
        buildResultText={fields => fields.description}
        additionalClasses={[styles.searchBar, isResultSelected ? styles.hidden : '']}
        onClick={onClickResult}
        attributes={{ 'test-id': testId ? `select-${testId}` : '' }}
      />
    </Fragment>
  );
};

AbiSearch.displayName = 'AbiSearch';
export default AbiSearch;
