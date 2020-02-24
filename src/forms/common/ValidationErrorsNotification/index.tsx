import React, { FunctionComponent } from 'react';

import QuestionBox from '../../../components/QuestionBox';

import styles from './styles.scss';

export const ValidationErrorsNotification: FunctionComponent<{}> = () => (
  <QuestionBox
    additionalClasses={[styles.errorBox]}
    hasError
    inputFields={[
      <div key="0" className={styles.validationErrors}>
        <i className="fas fa-exclamation-circle" />
        Form contains validation errors
      </div>
    ]}
  />
);

ValidationErrorsNotification.displayName = 'ValidationErrorsNotification';

export default ValidationErrorsNotification;
