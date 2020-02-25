import { configure, addDecorator } from '@storybook/react';
import { withInfo, setDefaults } from '@storybook/addon-info';

addDecorator(withInfo({
  inline: true,
  styles: {
    infoBody: {
      backgroundColor: 'none'
    }
  }
}) as any);

configure(require.context('../src', true, /\.stories\.tsx?$/), module);
