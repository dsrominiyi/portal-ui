import React, { ReactNode } from 'react';
import { storiesOf } from '@storybook/react';
import Comments from 'uikit-icons/lib/Comments';
import Happy from 'uikit-icons/lib/Happy';
import Bell from 'uikit-icons/lib/Bell';

import IconLink from '.';

const stories = storiesOf('IconLink', module);

const onClick = () => alert('You clicked!');

const render = (
  icon: ReactNode,
  title: string,
  notificationCount?: number,
  status?: Status,
  href?: string,
  additionalClasses?: string[]
) => (props?: any) => (
  <IconLink
    key={props && props.key}
    icon={icon}
    title={title}
    notificationCount={notificationCount}
    status={status}
    href={href}
    newTab={!!href}
    onClick={href ? undefined : onClick}
    additionalClasses={additionalClasses}
  />
);

export const storyRenders = {
  noNotificationsHref: render(<Comments />, 'Comments', 0, undefined, 'https://www.google.com'),
  noNotificationsOnClick: render(<Comments />, 'Comments', 0),
  successNotifications: render(<Comments />, 'Comments', 4, Status.Success),
  warningNotifications: render(<Bell />, 'Alerts', 2, Status.Warning),
  dangerNotifications: render(<Happy />, 'Happy', 99, Status.Danger),
  noStatusSupplied: render(<Bell />, 'Alerts', 5),
  additionalClass: render(<Happy />, 'Happy', undefined, undefined, undefined, ['additional-class'])
};

stories.add('Without notifications and with href', storyRenders.noNotificationsHref);
stories.add('Without notifications and wth onClick function', storyRenders.noNotificationsOnClick);
stories.add('With 4 success notifications', storyRenders.successNotifications);
stories.add('With 2 warning notifications', storyRenders.warningNotifications);
stories.add('With 99 danger notifications', storyRenders.dangerNotifications);
stories.add('With 5 notifications and no specified status', storyRenders.noStatusSupplied);
stories.add('With additional class', storyRenders.additionalClass);
