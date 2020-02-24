import React from 'react';
import { storiesOf } from '@storybook/react';

import SideNav, { Props as SideNavProps } from '.';

import * as configs from './nav-configs';

const stories = storiesOf('SideNav', module);

const render = (props?: SideNavProps) => () => <SideNav {...props} />;

export const storyRenders = {
  dashboardConfig: render(configs.dashboard),
  customerOverviewConfig: render(configs.customerOverview),
  noItems: render(),
  invalidItems: render({ items: [{}, '*', 'foo'] } as any)
};

stories.add('Dashboard config', storyRenders.dashboardConfig);
stories.add('Customer config', storyRenders.customerOverviewConfig);
stories.add('No items', storyRenders.noItems);
stories.add('Invalid items', storyRenders.invalidItems);
