import React from 'react';

import PrivateCarIcon from '../assets/svg/icon-pt-private-car.svg';
import HouseholdIcon from '../assets/svg/icon-pt-household.svg';
import TravelIcon from '../assets/svg/icon-pt-travel.svg';
import CaravanIcon from '../assets/svg/icon-pt-caravan.svg';
import TruckIcon from '../assets/svg/icon-pt-truck.svg';
import CommercialCombinedIcon from '../assets/svg/icon-pt-commercial-combined.svg';
import PublicLiabilityIcon from '../assets/svg/icon-pt-public-liability.svg';
import CaterersIcon from '../assets/svg/icon-pt-caterers.svg';

export enum PolicyType {
  PrivateCar = 'pc',
  Household = 'hh',
  Travel = 'tv',
  Caravan = 'cn',
  Truck = 'cvt',
  CommercialCombined = 'cc',
  PublicLiability = 'pl',
  Caterers = 'ct'
}

export const policyTypeInfoMap = {
  [PolicyType.PrivateCar]: { icon: <PrivateCarIcon />, displayName: 'Private Car' },
  [PolicyType.Household]: { icon: <HouseholdIcon />, displayName: 'Household' },
  [PolicyType.Travel]: { icon: <TravelIcon />, displayName: 'Travel' },
  [PolicyType.Caravan]: { icon: <CaravanIcon />, displayName: 'Caravan' },
  [PolicyType.Truck]: { icon: <TruckIcon />, displayName: 'Truck' },
  [PolicyType.CommercialCombined]: {
    icon: <CommercialCombinedIcon />,
    displayName: 'Commercial Combined'
  },
  [PolicyType.PublicLiability]: {
    icon: <PublicLiabilityIcon />,
    displayName: 'Public Liability'
  },
  [PolicyType.Caterers]: { icon: <CaterersIcon />, displayName: 'Caterers' }
};
