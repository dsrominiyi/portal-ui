import React, { FunctionComponent } from 'react';

import UserImage from '../UserImage';

import styles from './styles.scss';

interface Props {
  name: UserName;
  imageUrl?: string;
}

export const UserLink: FunctionComponent<Props> = ({ name, imageUrl }: Props) => (
  <div className={styles.userLink}>
    <div className={styles.topbarDivider} />
    <div className={styles.userContainer}>
      <span className={styles.userName}>{`${name.forename} ${name.surname}`}</span>
      <UserImage name={name} imageUrl={imageUrl} />
    </div>
  </div>
);

UserLink.displayName = 'UserLink';
export default UserLink;
