import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './styles.scss';

export interface Props {}

/* eslint-disable react/prefer-stateless-function */
export class Dashboard extends Component<Props> {
  public render() {
    return <div className={styles.dashboardContainer} />;
  }
}

const mapStateToProps = (_state: CombinedState) => ({});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
