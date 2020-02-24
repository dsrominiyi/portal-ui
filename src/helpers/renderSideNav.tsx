import React from 'react';
import { Location } from 'history';

import SideNav, { Props as SideNavProps } from '../components/SideNav';

import * as configs from '../components/SideNav/nav-configs';
import routes from '../routes';

const renderSideNav = ({ pathname }: Location) => {
  const pathnameMatch = pathname.match(/^(\/[\w-]*)\/?.*/);
  if (!pathnameMatch) {
    return undefined;
  }
  const route = pathnameMatch[1];

  let config: SideNavProps;

  switch (route) {
    case routes.dashboard:
      config = configs.dashboard;
      break;
    case routes.newIndividual:
    case routes.newCompany:
    case routes.customerSearch:
      config = configs.customer;
      break;
    case routes.customer:
      config = configs.customerOverview;
      break;
    default:
      return undefined;
  }

  return <SideNav {...config} />;
};

export default renderSideNav;
