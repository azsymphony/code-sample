import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
/* eslint-disable max-len */
/* Sagas */
import authSaga from './pages/auth/auth-saga';
import accountSaga from './pages/user-pages/public/left-side-bar/account/account-saga';
import cargoInquirySaga from './pages/user-pages/public/left-side-bar/cargo-inquiry/cargo-inquiry-saga';
import contactInquirySaga from './pages/user-pages/public/left-side-bar/contact-inquiry/contact-inquiry-saga';
import contactListFiltersSaga from './pages/user-pages/public/contact-list/contact-list-filters/contact-list-filters-saga';
import contactListTableSaga from './pages/user-pages/public/contact-list/contact-list-table/contact-list-table-saga';
/* Reducers */
import authReducer from './pages/auth/auth-reducer';
import accountReducer from './pages/user-pages/public/left-side-bar/account/account-reducer';
import bunkerPricesTooltipReducer from './pages/user-pages/public/home/map/bunker-prices-tooltip/bunker-prices-tooltip-reducer';
import cargoInquiryReducer from './pages/user-pages/public/left-side-bar/cargo-inquiry/cargo-inquiry-reducer';
import contactListFiltersReducer from './pages/user-pages/public/contact-list/contact-list-filters/contact-list-filters-reducer';
import contactInquiryReducer from './pages/user-pages/public/left-side-bar/contact-inquiry/contact-inquiry-reducer';
/* eslint-enable max-len */
/* action types for logout */
import { ActionTypes } from './pages/auth/auth-actions';

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
    authReducer,
    accountReducer,
    bunkerPricesTooltipReducer,
    cargoInquiryReducer,
    contactInquiryReducer,
    contactListFiltersReducer,
});

const appReducer = (state, action) => {
    if (action.type === ActionTypes.AUTH_LOGOUT_USER || action.type === ActionTypes.AUTH_RESET_REDUCERS) {
        /* eslint-disable */
        state = undefined;
        /* eslint-enable */
    }
    return reducer(state, action);
};

const enhancer = applyMiddleware(sagaMiddleware);

export function getStore(preloadedState) {
    return createStore(appReducer, preloadedState, enhancer);
}

export function startSagas() {
    sagaMiddleware.run(authSaga);
    sagaMiddleware.run(accountSaga);
    sagaMiddleware.run(cargoInquirySaga);
    sagaMiddleware.run(contactInquirySaga);
    sagaMiddleware.run(contactListFiltersSaga);
    sagaMiddleware.run(contactListTableSaga);
}
