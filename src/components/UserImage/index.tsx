import React, { FunctionComponent } from 'react';

import styles from './styles.scss';

interface Props {
  name: UserName;
  imageUrl?: string;
  additionalClasses?: string[];
}

export const UserImage: FunctionComponent<Props> = ({
  name,
  imageUrl,
  additionalClasses = []
}: Props) => {
  const fullName = `${name.forename} ${name.surname}`;

  const imgClasses = [styles.userPhoto, ...additionalClasses];
  const iconClasses = [styles.defaultUserIcon, ...additionalClasses];

  const userImage = (
    <img src={imageUrl} alt={fullName} title={fullName} className={imgClasses.join(' ')} />
  );
  const defaultIcon = (
    <span className={iconClasses.join(' ')}>
      {`${name.forename.charAt(0)}${name.surname.charAt(0)}`}
    </span>
  );

  return imageUrl ? userImage : defaultIcon;
};

UserImage.displayName = 'UserImage';
export default UserImage;
