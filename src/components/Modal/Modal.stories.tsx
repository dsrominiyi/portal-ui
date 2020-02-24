import React, { FunctionComponent, ReactNode, useState, Fragment } from 'react';
import { storiesOf } from '@storybook/react';

import Link from '../Link';
import Modal from '.';

import { storyRenders as questionBoxStories } from '../QuestionBox/QuestionBox.stories';
import { storyRenders as buttonStories } from '../Button/Button.stories';

import { footerActions } from './styles.scss';

interface ShowModalProps {
  renderModal(props: any): ReactNode;
}

const stories = storiesOf('Modal', module).addParameters({
  info: { source: false, propTables: [Modal] }
});

export const render = (body: ReactNode[], header?: ReactNode, footer?: ReactNode) => (
  props: any = {}
) => (
  <Modal
    isVisible={typeof props.isVisible === 'undefined' ? true : props.isVisible}
    body={body}
    header={header}
    footer={footer}
    hideModal={props.hideModal || (() => {})}
  />
);

const ShowModal: FunctionComponent<ShowModalProps> = ({ renderModal }) => {
  const [isVisible, setVisible] = useState(true);
  const hideModal = () => setVisible(false);

  return (
    <Fragment>
      <Link label="Show modal" onClick={() => setVisible(true)} />
      {renderModal({ isVisible, hideModal })}
    </Fragment>
  );
};

const header = 'Modal Header';
const body = [
  questionBoxStories.withAffixedField({ key: 0 }),
  questionBoxStories.withDropdown({ key: 1 })
];
const longBody = [
  questionBoxStories.withAffixedField({ key: 0 }),
  questionBoxStories.withDropdown({ key: 1 }),
  questionBoxStories.withAffixedField({ key: 0 }),
  questionBoxStories.withDropdown({ key: 1 }),
  questionBoxStories.withAffixedField({ key: 0 }),
  questionBoxStories.withDropdown({ key: 1 }),
  questionBoxStories.withAffixedField({ key: 0 }),
  questionBoxStories.withDropdown({ key: 1 }),
  questionBoxStories.withAffixedField({ key: 0 }),
  questionBoxStories.withDropdown({ key: 1 }),
  questionBoxStories.withAffixedField({ key: 0 }),
  questionBoxStories.withDropdown({ key: 1 })
];
const footer = <div className={footerActions}>{buttonStories.default()}</div>;

export const storyRenders = {
  withHeaderAndFooter: render(body, header, footer),
  longBodyWithHeaderAndFooter: render(longBody, header, footer),
  noFooter: render(body, header),
  noHeaderOrFooter: render(body)
};

stories.add('With header & footer', () => (
  <ShowModal renderModal={storyRenders.withHeaderAndFooter} />
));
stories.add('No footer', () => <ShowModal renderModal={storyRenders.noFooter} />);
stories.add('No header or footer', () => <ShowModal renderModal={storyRenders.noHeaderOrFooter} />);
stories.add('Long body with footer and header', () => (
  <ShowModal renderModal={storyRenders.longBodyWithHeaderAndFooter} />
));
