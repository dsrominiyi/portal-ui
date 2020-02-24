import React, { FunctionComponent } from 'react';
import classnames from 'classnames/bind';
import { utc as moment } from 'moment';

import UserImage from '../UserImage';

import statusClassMapper from '../../helpers/statusClassMapper';

import styles from './styles.scss';

export interface Author {
  name: UserName;
  profilePhoto?: string;
}

export interface Props {
  author: Author;
  date: string;
  header: string;
  body: string;
  status?: Status;
  onClick?(): void;
}

const cx = classnames.bind(styles);

const ContactNote: FunctionComponent<Props> = ({
  author: { name, profilePhoto },
  date,
  header,
  body,
  status = Status.Info,
  onClick
}: Props) => {
  const dateString = moment(date, 'YYYY-MM-DD').format('DD MMMM, YYYY');
  const containerClasses = cx({
    contactNote: true,
    clickable: !!onClick,
    ...statusClassMapper(status)
  });

  return (
    <div className={containerClasses} onClick={onClick}>
      <div className={styles.headerContainer}>
        <UserImage name={name} imageUrl={profilePhoto} additionalClasses={[styles.userImage]} />
        <div>
          <div className={styles.header}>{header}</div>
          <div className={styles.nameDate}>{`${name.forename} | ${dateString}`}</div>
        </div>
      </div>
      <div className={styles.bodyContainer}>{body}</div>
    </div>
  );
};

ContactNote.displayName = 'ContactNote';
export default ContactNote;
