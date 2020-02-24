import React, { ReactNode } from 'react';
import { storiesOf } from '@storybook/react';
import SubQuestion from '.';
import AffixedField from '../TextField/AffixedField';
import QuestionBox from '../QuestionBox';

import { formSection } from '../../forms/styles.scss';

const stories = storiesOf('SubQuestion', module);

const firstInputField = <AffixedField key="0" prefix={'\u00A3'} />;
const secondInputField = <AffixedField key="1" suffix="per month" />;

const singleQuestion: ReactNode[] = [
  <QuestionBox
    key="1"
    text="How much would you want to pay for your car insurance?"
    inputFields={[firstInputField]}
  />
];

const multipleQuestions: ReactNode[] = [
  <QuestionBox
    key="1"
    text="How much would you want to pay for your car insurance?"
    inputFields={[firstInputField]}
  />,
  <QuestionBox
    key="2"
    text="How often do you want to pay this amount?"
    inputFields={[secondInputField]}
  />
];

const render = (items?: ReactNode[]) => (props?: any) => (
  <SubQuestion visible={(props && props.visible) || true} items={items} />
);

const renderWithParentQuestion = (items?: ReactNode[]) => () => {
  return (
    <div className={formSection}>
      <QuestionBox
        key="1"
        text="What do you currently pay for your car insurance?"
        inputFields={[firstInputField]}
      />
      <SubQuestion visible items={items} />
    </div>
  );
};

export const storyRenders = {
  single: render(singleQuestion),
  multiple: render(multipleQuestions),
  withParentQuestion: renderWithParentQuestion(multipleQuestions)
};

stories.add('Single Sub-question', storyRenders.single);
stories.add('Multiple Sub-questions', storyRenders.multiple);
stories.add('With parent question', storyRenders.withParentQuestion);
