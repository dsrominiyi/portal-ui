import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import { utc as moment } from 'moment';

import Login from './containers/Login';
import Dashboard from './containers/Dashboard';
import Customer from './containers/Customer';
import Quotes from './containers/Customer/Quotes';
import NewIndividual from './containers/NewCustomer/Individual';
import NewCompany from './containers/NewCustomer/Company';
import SearchResults from './containers/SearchResults/index';
import PageNotFound from './containers/PageNotFound';

import SearchHeader from './components/Header/SearchHeader';
import Footer from './components/Footer';

import renderSideNav from './helpers/renderSideNav';

import rootReducer from './reducers';

import styles from './styles.scss';
import './style/global.scss';

import routes, { searchHeaderRoutes, footerRoutes } from './routes';

const composeEnhancers =
  ((window as unknown) as AppWindow).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(promiseMiddleware, thunkMiddleware))
);

const app = (
  <Provider store={store}>
    <Router>
      <div className={styles.appContainer}>
        <Route render={({ location }) => renderSideNav(location)} />
        <div className={styles.pageBody}>
          <Route path={searchHeaderRoutes} component={SearchHeader} />
          <Switch>
            <Route path={[routes.home, routes.login]} exact component={Login} />
            <Route path={routes.dashboard} component={Dashboard} />
            <Route path={routes.quotes} component={Quotes} />
            <Route path={routes.customer} exact component={Customer} />
            <Route path={routes.newIndividual} component={NewIndividual} />
            <Route path={routes.newCompany} component={NewCompany} />
            <Route path={routes.customerSearch} component={SearchResults} />
            <Route component={PageNotFound} />
          </Switch>
          <Route
            path={footerRoutes}
            render={() => <Footer copyrightYear={parseInt(moment().format('YYYY'), 10)} />}
          />
        </div>
      </div>
    </Router>
  </Provider>
);

render(app, document.getElementById('root'));
