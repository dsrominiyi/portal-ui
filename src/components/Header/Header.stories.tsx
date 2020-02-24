import React, { ReactNode } from 'react';
import { storiesOf } from '@storybook/react';

import Header from '.';
import UserLink from '../UserLink';
import { storyRenders as iconLinkRenders } from '../IconLink/IconLink.stories';

const stories = storiesOf('Header', module);

const render = (leftItems?: ReactNode[], rightItems?: ReactNode[]) => () => (
  <Header leftItems={leftItems} rightItems={rightItems} />
);

const leftItems = [<h4 key="0">Left Item 1</h4>, <h4 key="1">Left Item 2</h4>];
const rightItems = [
  iconLinkRenders.successNotifications({ key: '0' }),
  iconLinkRenders.warningNotifications({ key: '1' }),
  <UserLink key="2" name={{ forename: 'Test', surname: 'User' }} />
];

export const storyRenders = {
  leftItemsOnly: render(leftItems),
  rightItemsOnly: render(undefined, rightItems),
  rightAndLeftItems: render(leftItems, rightItems)
};

stories.add('Right Items Only', storyRenders.rightItemsOnly);
stories.add('Both Left and Right Items', storyRenders.rightAndLeftItems);
