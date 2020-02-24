import React, { MouseEvent } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import InfoBox from '../../components/InfoBox';
import PageTitle from '../../components/PageTitle';
import TableDisplay, { Row } from '../../components/TableDisplay';

import { pageContainer } from '../../style/global.scss';

import mockData from '../../../__mocks__/mock-data.json';

export interface Props {
  searchTerm: string;
  customers: CustomerSearchResult[];
}

export class SearchResults extends React.Component<Props> {
  private getResults = (): Row[] => {
    const customers = mockData.customerSearchResults;

    return customers.map(
      (customer: CustomerSearchResult): Row => {
        const {
          id,
          type,
          forename,
          surname,
          date_of_birth: dateOfBirth,
          postcode,
          company_name: companyName,
          trading_name: tradingName,
          registered_co_number: registeredCoNumber
        } = customer;

        const clientName = forename ? `${forename} ${surname}` : companyName;
        const line1 = dateOfBirth
          ? `DOB: ${moment(dateOfBirth, 'YYYY/MM/DD').format('DD/MM/YYYY')}`
          : `Trading name: ${tradingName}`;
        const line2 = registeredCoNumber ? `Reg No: ${registeredCoNumber}` : '';
        const details = [`Postcode: ${postcode}`, line1, line2];
        const multiLineDetails = details.map((item: string | undefined, key: number) => {
          return (
            <span key={key}>
              {item}
              <br />
            </span>
          );
        });
        return [id, clientName, type, multiLineDetails];
      }
    );
  };

  private onRowClick = (event: MouseEvent) => {
    event.preventDefault();
    alert(`Row was clicked!`);
  };

  public render() {
    const headers = ['REFERENCE', 'CLIENT', 'TYPE', 'DETAILS'];
    const rows = this.getResults();
    const { searchTerm } = this.props;
    return (
      <div className={pageContainer}>
        <PageTitle text="Find Customer" />
        <InfoBox
          header={`Results for: ${searchTerm}`}
          items={[
            <TableDisplay
              key="0"
              headers={headers}
              rows={rows}
              onRowClick={(event: MouseEvent) => {
                this.onRowClick(event);
              }}
            />
          ]}
        />
      </div>
    );
  }
}

const mapStateToProps = (_state: CombinedState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
