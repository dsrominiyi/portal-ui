import React from 'react';
import { NavItem } from '.';

import CoversureLogoText from '../../assets/svg/logo-coversure-text.svg';
import CoversureLogoArrows from '../../assets/svg/logo-coversure-arrows.svg';

import routes from '../../routes';

const links = {
  dashboard: {
    icon: <i className="fas fa-ellipsis-h" />,
    label: 'Dashboard',
    href: routes.dashboard
  },
  customer: {
    icon: <i className="fas fa-users" />,
    label: 'Customer',
    subItems: [
      { label: 'New Individual', href: routes.newIndividual },
      { label: 'New Company', href: routes.newCompany },
      { label: 'Find Customer' }
    ]
  },
  customerOverview: { icon: <i className="fas fa-user" />, label: 'Customer Overview' },
  customerDetails: { icon: <i className="fas fa-user-edit" />, label: 'Customer Details' },
  diary: { icon: <i className="fas fa-calendar-alt" />, label: 'Diary' },
  renewals: { icon: <i className="fas fa-file-alt" />, label: 'Renewals' },
  officeManagement: { icon: <i className="fas fa-sliders-h" />, label: 'Office Management' },
  payments: { icon: <i className="fas fa-credit-card" />, label: 'Payments' },
  reports: { icon: <i className="fas fa-file-pdf" />, label: 'Reports' },
  messages: { icon: <i className="fas fa-comments" />, label: 'Messages' },
  complaints: { icon: <i className="fas fa-frown" />, label: 'Complaints' },
  settings: { icon: <i className="fas fa-cog" />, label: 'Settings' },
  policies: { icon: <i className="fas fa-folder" />, label: 'Policies' },
  quotes: { icon: <i className="fas fa-folder-open" />, label: 'Quotes', href: routes.quotes },
  crossSell: { icon: <i className="fas fa-link" />, label: 'Cross Sell' },
  history: { icon: <i className="fas fa-history" />, label: 'History' },
  letters: { icon: <i className="fas fa-envelope-open-text" />, label: 'Letters' }
};

const generalLinks: NavItem[] = [
  links.diary,
  links.renewals,
  links.officeManagement,
  links.payments,
  links.reports,
  links.messages,
  links.complaints,
  links.settings
];

const header = <CoversureLogoText />;
const miniHeader = <CoversureLogoArrows />;

// configs -------------------------------

export const dashboard = {
  header,
  miniHeader,
  items: [{ ...links.dashboard, isActive: true }, links.customer, '-', ...generalLinks] as NavItem[]
};

export const customer = {
  header,
  miniHeader,
  items: [links.dashboard, { ...links.customer, isActive: true }, '-', ...generalLinks] as NavItem[]
};

export const customerOverview = {
  header,
  miniHeader,
  items: [
    links.dashboard,
    links.customer,
    { ...links.customerOverview, isActive: true },
    links.customerDetails,
    links.policies,
    links.quotes,
    links.crossSell,
    links.history,
    links.letters,
    '-',
    ...generalLinks
  ] as NavItem[]
};
