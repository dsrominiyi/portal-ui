import React, { Component, ReactNode, Fragment, MouseEvent } from 'react';
import SearchIcon from 'uikit-icons/lib/Search';
import TextField from '../TextField';

import styles from './styles.scss';
import Link from '../Link';

import debounce from '../../helpers/debounce';

export interface Props {
  additionalClasses?: string[];
  label?: string;
  searchResults: SearchResults;
  attributes?: { [attr: string]: string };
  searchFetchResults(
    searchTerm: string,
    questionId?: string
  ): { type: string; payload?: Promise<SearchResponse> };
  buildResultText?(fields: SearchHit['fields']): string;
  onClick?(event: MouseEvent<Element>): void;
  buildUrl?(result: SearchHit): string;
  buildMoreResultsUrl?(term: string): string;
}

interface State {
  searchTerm: string;
  fieldFocused: boolean;
}

export class SearchBar extends Component<Props> {
  public static isSearchSuggestion = (result: SearchResult): result is SearchSuggestion => {
    if ((result as SearchSuggestion).suggestion) {
      return true;
    }
    return false;
  };

  public static isSearchSuggestionList = (
    results: SearchResults
  ): results is SearchSuggestionList => {
    if (results && (results as SearchSuggestionList).suggestions) {
      return true;
    }
    return false;
  };

  public state: State = {
    searchTerm: '',
    fieldFocused: false
  };

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { searchFetchResults } = this.props;
    this.setState({ searchTerm: event.target.value });
    debounce(searchFetchResults, 200, false)(event.target.value);
  };

  private buildResults = () => {
    const { fieldFocused } = this.state;
    const { searchResults, onClick, buildUrl, buildMoreResultsUrl } = this.props;
    let resultSet: SearchResult[] = [];
    let renderedResults: ReactNode[] = [];

    if (searchResults) {
      resultSet = SearchBar.isSearchSuggestionList(searchResults)
        ? searchResults.suggestions
        : searchResults.hit;

      if (resultSet) {
        renderedResults = resultSet
          .filter((_value: SearchResult, index: number) => index < 10)
          .map((result: SearchResult) => (
            <li key={result.id}>
              <Link
                classNames={[styles.dropdownItem]}
                label={this.getResultText(result)}
                href={buildUrl ? buildUrl(result as SearchHit) : undefined}
                onClick={onClick}
              />
            </li>
          ));
      }
      if (searchResults.found > 10) {
        renderedResults.push(
          <li key="more-results">
            <Link
              classNames={[styles.dropdownItem]}
              label={`+ ${searchResults.found - 10} more results - click to view all`}
              href={buildMoreResultsUrl && buildMoreResultsUrl(this.state.searchTerm)}
              onClick={onClick}
            />
          </li>
        );
      }

      return (
        fieldFocused &&
        !!renderedResults.length && <ul className={styles.results}>{renderedResults}</ul>
      );
    }
  };

  private getResultText = (result: SearchResult): ReactNode => {
    const { buildResultText } = this.props;
    let resultText: string;

    if (SearchBar.isSearchSuggestion(result)) {
      resultText = result.suggestion;
    } else if (buildResultText) {
      resultText = buildResultText(result.fields);
    } else {
      const resultValues = Object.keys(result.fields).map(fieldKey => result.fields[fieldKey]);
      resultText = resultValues.join(' - ');
    }

    return this.highlightMatch(resultText);
  };

  private highlightMatch = (resultText: string): ReactNode => {
    const { searchTerm } = this.state;
    const matchIndex = resultText.toLowerCase().indexOf(searchTerm.toLowerCase());
    const postMatchIndex = matchIndex + searchTerm.length;

    return !searchTerm || matchIndex === -1 ? (
      resultText
    ) : (
      <Fragment>
        {resultText.slice(0, matchIndex)}
        <strong className={styles.matchedText}>
          {resultText.slice(matchIndex, postMatchIndex)}
        </strong>
        {resultText.slice(postMatchIndex)}
      </Fragment>
    );
  };

  public render() {
    const { additionalClasses = [], label, attributes } = this.props;
    const { searchTerm } = this.state;

    return (
      <div className={[styles.searchContainer, ...additionalClasses].join(' ')}>
        <TextField
          additionalClasses={[styles.searchInput]}
          value={searchTerm}
          label={label}
          placeholder="Search..."
          icon={<SearchIcon className={styles.searchIcon} />}
          reverseIconPosition
          onChange={this.onChange}
          onFocus={() => this.setState({ fieldFocused: true })}
          onBlur={() => this.setState({ fieldFocused: false })}
          {...attributes}
        />
        <div className={styles.resultsContainer}>{this.buildResults()}</div>
      </div>
    );
  }
}

export default SearchBar;
