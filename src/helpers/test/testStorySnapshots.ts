import { ReactElement } from 'react';
import { shallow, mount } from 'enzyme';

interface StoryRenders {
  [storyName: string]: () => ReactElement;
}

const testStorySnapshots = (
  storyRenders: StoryRenders,
  storiesToSkip: string[] = [],
  useMount?: boolean
) => {
  Object.entries(storyRenders).forEach(([storyName, storyRender]) => {
    if (!storiesToSkip.includes(storyName)) {
      const component = useMount ? mount(storyRender()) : shallow(storyRender());

      expect(component).toMatchSnapshot(storyName);
    }
  });
};

export default testStorySnapshots;
