import React from 'react';
import { storiesOf } from '@storybook/react';

import ContactNote, { Author } from '.';

const stories = storiesOf('ContactNote', module);

const render = (
  author: Author,
  date: string,
  header: string,
  body: string,
  status?: Status,
  onClick?: () => void
) => () => (
  <ContactNote
    author={author}
    date={date}
    header={header}
    body={body}
    status={status}
    onClick={onClick}
  />
);

const author = {
  name: { forename: 'John', surname: 'Doe' },
  profilePhoto: '/images/person-who-does-not-exist.jpg'
};
const date = '2019-11-19T16:18:41Z';

export const storyRenders = {
  infoNote: render(
    author,
    date,
    'Private Car Quote',
    'Provided client with private car quote. Was unable to offer rate due to garaging address.'
  ),
  successNote: render(
    author,
    date,
    'Adjustment',
    'Additional passenger added to Policy SN56789. Additional premium of £45.56.',
    Status.Success
  ),
  warningNote: render(
    author,
    date,
    'Renewal',
    'Policy SN23567 offered renewal terms.',
    Status.Warning
  ),
  dangerNote: render(
    author,
    date,
    'Rejected',
    'Policy SN23568 rejected due to fraudulent claim.',
    Status.Danger
  ),
  clickableNote: render(
    author,
    date,
    'Private Car Quote',
    'Provided client with private car quote. Was unable to offer rate due to garaging address.',
    Status.Info,
    () => alert('Clicked!')
  )
};

stories.add('Info note', storyRenders.infoNote);
stories.add('Success note', storyRenders.successNote);
stories.add('Warning note', storyRenders.warningNote);
stories.add('Danger note', storyRenders.dangerNote);
stories.add('With click action', storyRenders.clickableNote);
