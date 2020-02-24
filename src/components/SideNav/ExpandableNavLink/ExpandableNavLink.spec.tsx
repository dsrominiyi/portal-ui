import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { storyRenders, render, testItems } from './ExpandableNavLink.stories';
import testStorySnapshots from '../../../helpers/test/testStorySnapshots';

let component: ReactWrapper;

describe('ExpandableNavLink', () => {
  test('component story renders match snapshots', () => {
    testStorySnapshots(storyRenders);
  });

  describe('ExpandableNavLink functionality', () => {
    beforeEach(() => {
      component = mount(render('Customer', <i className="fas fa-user" />, testItems)());
    });

    test('clicking the NavLink adds the expanded class to the chevron icon', () => {
      component.find('.clickableLink').simulate('click');
      const chevronIcon = component.find('.chevron');

      expect(chevronIcon.props().className).toContain('expanded');
    });

    test('clicking the NavLink expands the dropdown', () => {
      const scrollHeight = 105;
      let dropDown = component.find('.dropDown');
      Object.defineProperty(dropDown.getDOMNode(), 'scrollHeight', { value: scrollHeight });

      component.find('.clickableLink').simulate('click');
      dropDown = component.find('.dropDown');

      expect(dropDown.getDOMNode().getAttribute('style')).toBe(`height: ${scrollHeight}px;`);
    });

    test('clicking the expanded NavLink retracts the dropdown', () => {
      let dropDown = component.find('.dropDown');
      Object.defineProperty(dropDown.getDOMNode(), 'scrollHeight', { value: 105 });

      const clickableLink = component.find('.clickableLink');
      clickableLink.simulate('click');
      clickableLink.simulate('click');
      dropDown = component.find('.dropDown');

      expect(dropDown.getDOMNode().getAttribute('style')).toBe('height: 0px;');
    });

    test('clicking the mini link sets the dropdown height property to auto', () => {
      component = mount(render('Customer', <i className="fas fa-user" />, testItems, true)());
      component.find('.clickableLink').simulate('click');
      const dropDown = component.find('.dropDown');

      expect(dropDown.getDOMNode().getAttribute('style')).toBe('height: auto;');
    });

    test('minimising the mini link adds the hidden class to dropdown', () => {
      component = mount(render('Customer', <i className="fas fa-user" />, testItems, true)());
      const clickableLink = component.find('.clickableLink');
      clickableLink.simulate('click');
      clickableLink.simulate('click');
      const dropDown = component.find('.dropDown');

      expect(dropDown.props().className).toContain('hidden');
    });

    test('changing the isMiniLink prop retracts/minimises the dropdown', () => {
      const clickableLink = component.find('.clickableLink');
      clickableLink.simulate('click');

      component.setProps({ isMiniLink: true });
      component.update();
      let dropDown = component.find('.dropDown');

      expect(dropDown.props().className).toContain('hidden');

      clickableLink.simulate('click');
      component.setProps({ isMiniLink: false });
      component.update();
      dropDown = component.find('.dropDown');

      expect(dropDown.getDOMNode().getAttribute('style')).toBe('height: 0px;');
    });
  });
});
