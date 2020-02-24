import React from 'react';
import { storiesOf } from '@storybook/react';

import PageTitle from '.';

const stories = storiesOf('PageTitle', module);

const render = (text: string) => () => <PageTitle text={text} />;

export const storyRenders = {
  default: render('Page Title')
};

stories.add('default', storyRenders.default);
