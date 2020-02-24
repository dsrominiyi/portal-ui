import React from 'react';
import { storiesOf } from '@storybook/react';

import Footer from '.';

const stories = storiesOf('Footer', module);

const render = (copyrightYear: number) => () => <Footer copyrightYear={copyrightYear} />;

export const storyRenders = {
  default: render(2019)
};

stories.add('Copyright Year supplied', storyRenders.default);
