import React from 'react';
import { shallow } from 'enzyme';
import { storyRenders } from './SideNav.stories';

import SideNav from '.';
import { dashboard as dashboardConfig } from './nav-configs';

import testStorySnapshots from '../../helpers/test/testStorySnapshots';

describe('SideNav', () => {
  test('component story renders match snapshots', () => {
    testStorySnapshots(storyRenders);
  });

  test('clicking the CircularButton toggles the isMiniNav state value', () => {
    const props = {
      header: <div className="header" />,
      miniHeader: <div className="miniHeader" />,
      items: dashboardConfig.items
    };
    const component = shallow(<SideNav {...props} />);

    // isMiniNav will be true
    component.find('CircularButton').simulate('click');

    expect(component.find('.header').length).toBe(0);
    expect(component.find('.miniHeader').length).toBe(1);
    component.find('NavLink').forEach(navLink => {
      expect((navLink.props() as any).isMiniLink).toBe(true);
    });
    component.find('ExpandableNavLink').forEach(navLink => {
      expect((navLink.props() as any).isMiniLink).toBe(true);
    });

    // isMiniNav will be false
    component.find('CircularButton').simulate('click');

    expect(component.find('.header').length).toBe(1);
    expect(component.find('.miniHeader').length).toBe(0);
    component.find('NavLink').forEach(navLink => {
      expect((navLink.props() as any).isMiniLink).toBe(false);
    });
    component.find('ExpandableNavLink').forEach(navLink => {
      expect((navLink.props() as any).isMiniLink).toBe(false);
    });
  });
});
