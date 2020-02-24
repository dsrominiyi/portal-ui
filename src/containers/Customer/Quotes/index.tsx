import React, { MouseEvent, Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/Button';
import ExtendedCustomerQuote from '../../../components/ExtendedCustomerQuote';
import PageTitle from '../../../components/PageTitle';
import InfoBox from '../../../components/InfoBox';

import { isIndividualCustomer, getIndividualFullName } from '../../../helpers/customerHelper';

import { pageContainer } from '../../../style/global.scss';
import styles from './styles.scss';

export interface Props {
  customer: CustomerResponse;
  quotes: Quote[];
}

export class Quotes extends Component<Props> {
  public handleNewQuoteBtnClick = (event: MouseEvent) => {
    event.preventDefault();
    alert('Clicked!');
  };

  private getQuotes = () => {
    const { quotes } = this.props;

    return quotes.length
      ? quotes.map((quote: Quote) => <ExtendedCustomerQuote key={quote.id} quote={quote} />)
      : [];
  };

  public render() {
    const { customer } = this.props;
    const { type, data } = customer;
    const customerName = isIndividualCustomer(data)
      ? `${getIndividualFullName(data.name)} (${type})`
      : `${data.companyName} (${type})`;

    return (
      <div className={pageContainer}>
        <div className={styles.topContainer}>
          <div className={styles.titleContainer}>
            <PageTitle text="Quotes" />
          </div>
          <div className={styles.actionsContainer}>
            <Button
              label="New Quote"
              onClick={(event: MouseEvent) => this.handleNewQuoteBtnClick(event)}
              status={Status.Success}
            />
          </div>
        </div>
        <div>
          <InfoBox
            header={customerName}
            useDivider
            items={this.getQuotes()}
            additionalClasses={[styles.fullWidth]}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ customer: { customer, quotes } }: CombinedState) => ({
  customer,
  quotes
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Quotes);
