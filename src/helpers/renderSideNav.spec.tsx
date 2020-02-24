import { Location } from 'history';
import renderSideNav from './renderSideNav';

import routes from '../routes';
import * as navConfigs from '../components/SideNav/nav-configs';

describe('renderSideNav', () => {
  it('returns an instance of SideNav with the correct config based on the route', () => {
    const location = { pathname: routes.dashboard } as Location;
    let sideNav = renderSideNav(location);

    expect(sideNav && sideNav.props).toEqual(navConfigs.dashboard);

    location.pathname = routes.customer;
    sideNav = renderSideNav(location);

    expect(sideNav && sideNav.props).toEqual(navConfigs.customerOverview);

    location.pathname = routes.newIndividual;
    sideNav = renderSideNav(location);

    expect(sideNav && sideNav.props).toEqual(navConfigs.customer);

    location.pathname = routes.newCompany;
    sideNav = renderSideNav(location);

    expect(sideNav && sideNav.props).toEqual(navConfigs.customer);
  });

  it('returns undefined for an invalid route', () => {
    const location = { pathname: '$$$' } as Location;
    const sideNav = renderSideNav(location);

    expect(sideNav).toBe(undefined);
  });

  it('returns undefined for an unconfigured route', () => {
    const location = { pathname: '/' } as Location;
    const sideNav = renderSideNav(location);

    expect(sideNav).toBe(undefined);
  });
});
