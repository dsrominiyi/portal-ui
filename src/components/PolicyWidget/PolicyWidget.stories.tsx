import React, { ReactNode } from 'react';
import { storiesOf } from '@storybook/react';
import { PolicyType } from '../../helpers/policyTypeInfoMap';

import PolicyWidget from '.';
import { storyRenders as quoteSummaryRenders } from '../QuoteSummary/QuoteSummary.stories';

const stories = storiesOf('PolicyWidget', module);

const defaultId = 'SN18376';

const render = (type: PolicyType, id: string = defaultId, additionalItems?: ReactNode[]) => () => (
  <PolicyWidget id={id} type={type} additionalItems={additionalItems} />
);

export const storyRenders = {
  privateCar: render(PolicyType.PrivateCar),
  household: render(PolicyType.Household),
  travel: render(PolicyType.Travel),
  caravan: render(PolicyType.Caravan),
  truck: render(PolicyType.Truck),
  commercialCombined: render(PolicyType.CommercialCombined),
  publicLiability: render(PolicyType.PublicLiability),
  caterers: render(PolicyType.Caterers),
  longId: render(PolicyType.PrivateCar, 'SN27391948390230384'),
  additionalItems: render(PolicyType.Truck, defaultId, [quoteSummaryRenders.withRate({ key: 0 })])
};

stories.add('Private Car', storyRenders.privateCar);
stories.add('Household', storyRenders.household);
stories.add('Travel', storyRenders.travel);
stories.add('Caravan', storyRenders.caravan);
stories.add('Truck', storyRenders.truck);
stories.add('Commercial Combined', storyRenders.commercialCombined);
stories.add('Public Liability', storyRenders.publicLiability);
stories.add('Caterers', storyRenders.caterers);
stories.add('Long ID', storyRenders.longId);
stories.add('Additional Items', storyRenders.additionalItems);
