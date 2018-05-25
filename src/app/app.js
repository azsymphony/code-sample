/* eslint-disable no-console */
import React from 'react';
import ReactGA from 'react-ga';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { IndexRoute, Route, Router, Redirect, hashHistory } from 'react-router';
/* config */
import envConfig from 'envConfig';
/* store */
import { getStore, startSagas } from './app-store';
/* axios interceptors */
import './interceptors';
/* pages */
import Login from './pages/auth/login/login';
import ResetPassword from './pages/auth/reset-password/reset-password';
import User from './pages/user-pages/user';
import ContactList from './pages/user-pages/public/contact-list/contact-list';
/* components */
import Wrapper from 'components/wrapper/wrapper';
import Public from './pages/user-pages/public/public';
/* helpers */
import Inspectlet from 'utils/helpers/inspectlet-helper';
/* styles */
import './assets/fonts/icons/font-icons.scss';
import './assets/fonts/dosis/font-dosis.scss';
import './assets/fonts/roboto/font-roboto.scss';
import './app.scss';

/* auth functions */
function requireCredentials(nextState, replace) {
    const activeToken = localStorage.getItem('access_token');
    if (!activeToken) {
        replace('/login');
    }
}

function onEnter(nextState, replace) {
    const activeToken = localStorage.getItem('access_token');
    if (activeToken) {
        replace('/map');
    }
}

/* Google Analytics and Inspectlet */
const options = {
    inspectlet: {
        debug: false
    },
    googleAnalytics: {
        debug: false
    }
};

Inspectlet.initialize(envConfig.inspectletId, options.inspectlet);
ReactGA.initialize(envConfig.googleAnalyticsId, options.googleAnalytics);

function logPageView() {
    ReactGA.set({ page: window.location.hash + window.location.search });
    ReactGA.pageview(window.location.hash + window.location.search);
}

/* Route setup */
const routes = (
    <Router history={hashHistory} onUpdate={logPageView}>
        <Route component={Wrapper}>
            <Route path="gsm" component={Gsm} />
            <Route path="login" component={Login} onEnter={onEnter} />
            <Route path="reset-password" component={ResetPassword} onEnter={onEnter} />
            <Route component={User} onEnter={requireCredentials}>
                <Route component={Public}>
                    <Route path="map" component={HomePage} />
                    <Route path="position-list" component={PositionList} />
                    <Route path="fleet-management">
                        <IndexRoute component={FleetManagement} />
                        <Route path="new" component={FleetManagement} />
                        <Route path=":id">
                            <IndexRoute component={FleetManagement} />
                            <Route path="edit" component={FleetManagement} />
                        </Route>
                        <Redirect from="*" to="/fleet-management" />
                    </Route>
                    <Route path="contact-list" component={ContactList} />
                    <Route path="test" component={TestPage} />
                </Route>
                <Route component={Admin} path="admin">
                    <Route path="user-management">
                        <IndexRoute component={AdminUserManagement} />
                        <Route path="new" component={AdminUserManagement} />
                        <Route path="edit/:id" component={AdminUserManagement} />
                        <Redirect from="*" to="/admin/user-management" />
                    </Route>
                </Route>
                <Redirect from="*" to="/map" />
            </Route>
            <Redirect from="*" to="/login" />
        </Route>
    </Router>
);

/* Store initialization */
const store = getStore();

startSagas();

/* App render */
render(
    (
        <Provider store={store}>
            {routes}
        </Provider>
    ),
    document.getElementById('app')
);

export default store;
