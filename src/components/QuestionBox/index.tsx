import React, { FunctionComponent, ReactNode } from 'react';
import classnames from 'classnames/bind';

import formStyles from '../../forms/styles.scss';
import styles from './styles.scss';

interface Props {
  additionalClasses?: string[];
  text?: string;
  inputFields: ReactNode[];
  hasError?: boolean;
  errorText?: string;
}

const cx = classnames.bind(styles);

export const QuestionBox: FunctionComponent<Props> = ({
  additionalClasses = [],
  text,
  inputFields,
  hasError,
  errorText
}: Props) => (
  <div className={[...additionalClasses, cx({ questionBox: true, hasError })].join(' ')}>
    {text && <div className={[formStyles.label, styles.questionText].join(' ')}>{text}</div>}
    <div>{inputFields}</div>
    {hasError && errorText && <div className={styles.errorText}>{errorText}</div>}
  </div>
);

QuestionBox.displayName = 'QuestionBox';

export default QuestionBox;
