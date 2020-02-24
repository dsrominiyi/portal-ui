import React from 'react';

import styles from './styles.scss';

interface Props {
  copyrightYear: number;
}

export const Footer: React.FunctionComponent<Props> = ({ copyrightYear }) => (
  <div className={styles.footer}>{`Copyright \u00A9 Datamatters ${copyrightYear}`}</div>
);

Footer.displayName = 'Footer';
export default Footer;
