import React, { MouseEvent, Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../components/Button';
import ContactNote, { Props as ContactNoteProps } from '../../components/ContactNote';
import CustomerPolicy from '../../components/CustomerPolicy';
import CustomerQuote from '../../components/CustomerQuote';
import PageTitle from '../../components/PageTitle';
import InfoBox from '../../components/InfoBox';

import { isIndividualCustomer, getIndividualFullName } from '../../helpers/customerHelper';

import { pageContainer } from '../../style/global.scss';
import styles from './styles.scss';

export interface Props {
  customer: CustomerResponse;
  quotes: Quote[];
  policies: Policy[];
  contactHistory: ContactNoteProps[];
}

export class Customer extends Component<Props> {
  public handleNewQuoteBtnClick = (event: MouseEvent) => {
    event.preventDefault();
    alert('Clicked!');
  };

  private getQuotes = () => {
    const { quotes } = this.props;

    return quotes.length
      ? quotes.map((quote: Quote) => <CustomerQuote key={quote.id} quote={quote} />)
      : [];
  };

  private getPolicies = () => {
    const { policies } = this.props;

    return policies.length
      ? policies.map((policy: Policy) => <CustomerPolicy key={policy.id} policy={policy} />)
      : [];
  };

  private getContactHistory = () => {
    const { contactHistory } = this.props;
    return contactHistory.length
      ? contactHistory.map((contactNote: ContactNoteProps, i: number) => (
          <ContactNote
            key={`contactNote_${i}`}
            author={contactNote.author}
            date={contactNote.date}
            header={contactNote.header}
            body={contactNote.body}
            status={contactNote.status}
          />
        ))
      : [];
  };

  public render() {
    const { customer } = this.props;
    const { type, data } = customer;
    const customerName = isIndividualCustomer(data)
      ? getIndividualFullName(data.name)
      : data.companyName;

    return (
      <div className={pageContainer}>
        <div className={styles.topContainer}>
          <div className={styles.titleContainer}>
            <PageTitle text={`${customerName} (${type})`} />
          </div>
          <div className={styles.actionsContainer}>
            <Button
              label="New Quote"
              onClick={(event: MouseEvent) => this.handleNewQuoteBtnClick(event)}
              status={Status.Success}
            />
          </div>
        </div>
        <div className={styles.bodyContainer}>
          <div className={styles.infoBoxContainer}>
            <InfoBox header="Policies" useDivider items={this.getPolicies()} />
          </div>
          <div className={styles.infoBoxContainer}>
            <InfoBox header="Quotes" useDivider items={this.getQuotes()} />
          </div>
          <div className={styles.infoBoxContainer}>
            <InfoBox header="History" items={this.getContactHistory()} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  customer: { customer, quotes, policies, contactHistory }
}: CombinedState) => ({
  customer,
  quotes,
  policies,
  contactHistory
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Customer);
