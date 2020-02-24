const routes = {
  home: '/',
  login: '/login',
  dashboard: '/dashboard',
  customer: '/customer',
  newIndividual: '/new-individual',
  newCompany: '/new-company',
  customerSearch: '/customer/search',
  quotes: '/customer/quotes'
};

export const searchHeaderRoutes = [
  routes.dashboard,
  routes.customer,
  routes.newIndividual,
  routes.newCompany,
  routes.customerSearch,
  routes.quotes
];

export const footerRoutes = Object.values(routes).filter(
  route => ![routes.home, routes.login].includes(route)
);

export default routes;
