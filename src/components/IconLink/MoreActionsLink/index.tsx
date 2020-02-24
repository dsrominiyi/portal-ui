import React, { FunctionComponent, MouseEvent } from 'react';
import MoreIcon from 'uikit-icons/lib/More';
import IconLink from '../index';
import styles from './styles.scss';

interface Props {
  onClick(event: MouseEvent): void;
}

export const MoreActionsLink: FunctionComponent<Props> = ({ onClick }) => (
  <IconLink
    icon={<MoreIcon onClick={onClick} />}
    additionalClasses={[styles.iconLinkAction]}
    title="More"
  />
);

export default MoreActionsLink;
