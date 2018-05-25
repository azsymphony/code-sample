import { ActionTypes } from './user-actions';

const initialState = {
    user: null,
    permissions: null,
    restrictedRoutes: [],
    settings: null,
    settingUpdated: ''
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
    case ActionTypes.USER_SET: {
        return Object.assign({}, state, {
            user: action.user,
            permissions: action.permissions,
            restrictedRoutes: action.restrictedRoutes,
            settings: action.settings
        });
    }
    case ActionTypes.USER_SETTINGS_SET: {
        return Object.assign({}, state, {
            settings: action.settings,
            settingUpdated: action.settingUpdated
        });
    }
    case ActionTypes.USER_SETTINGS_UPDATE_LOADED: {
        return Object.assign({}, state, {
            settingUpdated: ''
        });
    }
    default:
        return state;
    }
}
