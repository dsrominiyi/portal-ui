import React, { ReactNode } from 'react';
import { storiesOf } from '@storybook/react';

import QuestionBox from '.';
import { storyRenders as textFieldStoryRender } from '../TextField/TextField.stories';
import { storyRenders as dropdownStoryRender } from '../Dropdown/Dropdown.stories';
import { storyRenders as affixFieldStoryRender } from '../TextField/AffixedField/AffixedField.stories';

const stories = storiesOf('QuestionBox', module);

const render = (
  inputFields: ReactNode[],
  text?: string,
  hasError?: boolean,
  errorText?: string
) => (props?: any) => (
  <QuestionBox
    key={props && props.key}
    text={text}
    inputFields={inputFields}
    hasError={hasError}
    errorText={errorText}
  />
);

const componentKey = { key: 0 };
const textField = textFieldStoryRender.emailField(componentKey);
const dropdown = dropdownStoryRender.withSelectedValue(componentKey);
const affixedField = affixFieldStoryRender.prefixed(componentKey);

export const storyRenders = {
  withTextField: render([textField], 'With TextField'),
  withDropdown: render([dropdown], 'With Dropdown'),
  withAffixedField: render([affixedField], 'With Affixed Field'),
  withoutQuestionText: render([textField]),
  withErrorAndText: render([textField], undefined, true, 'Please confirm first name')
};

stories.add('With TextField', storyRenders.withTextField);
stories.add('With Dropdown', storyRenders.withDropdown);
stories.add('With AffixedField component', storyRenders.withAffixedField);
stories.add('Without question text', storyRenders.withoutQuestionText);
stories.add('With error and text', storyRenders.withErrorAndText);
