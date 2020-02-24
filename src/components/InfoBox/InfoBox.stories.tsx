import React, { ReactNode } from 'react';
import { storiesOf } from '@storybook/react';
import MoreActionsLink from '../IconLink/MoreActionsLink/index';
import { PolicyType } from '../../helpers/policyTypeInfoMap';

import PolicyWidget from '../PolicyWidget';
import InfoBox from '.';

const stories = storiesOf('InfoBox', module);

const defaultItems: ReactNode[] = [];

for (let i = 0; i < 10; i += 1) {
  const policyWidgetProps = {
    id: `PN000${i}`,
    type: PolicyType.PrivateCar
  };
  defaultItems.push(<PolicyWidget {...policyWidgetProps} />);
}

const render = (
  items?: ReactNode[],
  header?: string,
  useDivider?: boolean,
  subHeader?: string,
  moreActions?: ReactNode[],
  hideHeaderDivider?: boolean
) => () => (
  <InfoBox
    items={items}
    header={header}
    useDivider={useDivider}
    subHeader={subHeader}
    moreActions={moreActions}
    hideHeaderDivider={hideHeaderDivider}
  />
);

export const storyRenders = {
  titleAndDivider: render(defaultItems, 'Policies', true),
  noDivider: render(defaultItems, 'Policies'),
  noTitle: render(defaultItems, undefined),
  noItems: render(undefined, 'Policies'),
  subHeaderAndMoreActions: render(defaultItems, 'Policies', true, 'Private Car', [
    <MoreActionsLink key="moreActionsLink" onClick={() => alert('You clicked!')} />
  ]),
  noHeaderDivider: render(defaultItems, 'Policies', true, undefined, undefined, true)
};

stories.add('Title and divider', storyRenders.titleAndDivider);
stories.add('Without divider', storyRenders.noDivider);
stories.add('Without title', storyRenders.noTitle);
stories.add('Without items', storyRenders.noItems);
stories.add('Sub Header and MoreActions', storyRenders.subHeaderAndMoreActions);
stories.add('No Header Divider', storyRenders.noHeaderDivider);
