import { takeEvery } from 'redux-saga';
import { put, select } from 'redux-saga/effects';
/* actions */
import { ActionTypes } from './user-actions';
/* services */
import UserService from 'services/user-service';

function* getUser() {
    const pagePermissionsMap = {
        MenuVesselsManagement: '/fleet-management',
        MenuPositionList: '/position-list',
        MenuAdminManagement: '/admin'
    };
    const response = yield UserService.get();
    if (response) {
        const user = {
            UserId: response.UserId,
            Email: response.Email,
            FirstName: response.FirstName,
            LastName: response.LastName,
            Phone: response.Phone,
            UserCompanies: response.UserCompanies,
            Position: response.Position,
            Location: response.Location,
            ProfilePhoto: response.ProfilePhoto,
            WorkPhone: response.WorkPhone
        };

        const restrictedRoutes = [];
        Object.keys(pagePermissionsMap).forEach((key) => {
            if (response.UserPermissions[key] === false) {
                restrictedRoutes.push(pagePermissionsMap[key]);
            }
        });
        yield put({
            type: ActionTypes.USER_SET,
            user,
            restrictedRoutes,
            permissions: response.UserPermissions,
            settings: response.UserSettings
        });
    }
}

function* updateUserSettings(action) {
    const settings = yield select(state => state.userReducer.settings);
    const updatedSettings = yield UserService.updateSettings(Object.assign({}, settings, action.settings));
    if (updatedSettings) {
        yield put({
            type: ActionTypes.USER_SETTINGS_SET,
            settings: updatedSettings,
            settingUpdated: action.settingUpdated
        });
    }
}

export default function* userSaga() {
    yield takeEvery(ActionTypes.USER_GET, getUser);
    yield takeEvery(ActionTypes.USER_SETTINGS_UPDATE, updateUserSettings);
}
