import React, { FunctionComponent } from 'react';
import styles from './styles.scss';

interface Props {
  text: string;
}

export const PageTitle: FunctionComponent<Props> = ({ text }: Props) => (
  <div className={styles.pageTitle} test-id="page-title">
    {text}
  </div>
);

PageTitle.displayName = 'PageTitle';
export default PageTitle;
