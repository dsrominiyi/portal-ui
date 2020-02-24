import React, { FunctionComponent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { utc as moment } from 'moment';

import CommentsIcon from 'uikit-icons/lib/Comments';
import BellIcon from 'uikit-icons/lib/Bell';

import IconLink from '../../IconLink';
import UserLink from '../../UserLink';
import SearchBar from '../../SearchBar';
import Header from '..';

import { customerSearchFetchResults } from '../../../actions/search';

import styles from './styles.scss';

export const SearchHeader: FunctionComponent = () => {
  const dispatch = useDispatch();
  const {
    user,
    search: { customerSearchResults }
  } = useSelector((state: CombinedState) => ({
    user: state.user as User,
    search: state.search as SearchState
  }));
  const buildCustomerUrl = (customerResult: SearchHit) => {
    return `/customer/${customerResult.fields.id}`;
  };
  const buildCustomerResultsUrl = (searchTerm: string) => `/customer/search/?term=${searchTerm}`;

  const searchFetchResults = (searchTerm: string) => {
    return dispatch(customerSearchFetchResults(searchTerm));
  };

  const buildResultText = ({
    type,
    forename,
    surname,
    date_of_birth,
    company_name,
    registered_co_number,
    postcode
  }: SearchHit['fields']) => {
    const info = company_name
      ? `${company_name} (${registered_co_number})`
      : `${forename} ${surname} (${moment(date_of_birth, 'YYYY-MM-DD').format('DD/MM/YYYY')})`;

    return `${type} - ${info} - ${postcode}`;
  };

  return (
    <Header
      leftItems={[
        <SearchBar
          key="0"
          additionalClasses={[styles.searchInput]}
          searchFetchResults={searchFetchResults}
          searchResults={customerSearchResults}
          buildResultText={buildResultText}
          buildUrl={buildCustomerUrl}
          buildMoreResultsUrl={buildCustomerResultsUrl}
        />
      ]}
      rightItems={[
        <IconLink
          key="0"
          icon={<CommentsIcon className={styles.commentsIcon} />}
          title="Comments"
          notificationCount={4}
          status={Status.Success}
        />,
        <IconLink
          key="1"
          icon={<BellIcon className={styles.bellIcon} />}
          title="Alerts"
          notificationCount={2}
          status={Status.Warning}
        />,
        user ? <UserLink name={user.name} imageUrl={user.profilePhoto} /> : undefined
      ]}
    />
  );
};

SearchHeader.displayName = 'SearchHeader';
export default SearchHeader;
