export const ActionTypes = {
    USER_GET: 'USER_GET',
    USER_SET: 'USER_SET',
    USER_SETTINGS_SET: 'USER_SETTINGS_SET',
    USER_SETTINGS_UPDATE: 'USER_SETTINGS_UPDATE',
    USER_SETTINGS_UPDATE_LOADED: 'USER_SETTINGS_UPDATE_LOADED'
};

export function getUser(dispatch) {
    dispatch({
        type: ActionTypes.USER_GET
    });
}

export function updateUserSettings(dispatch, settings, settingUpdated) {
    dispatch({
        type: ActionTypes.USER_SETTINGS_UPDATE,
        settings,
        settingUpdated
    });
}
export function settingUpdateLoaded(dispatch) {
    dispatch({
        type: ActionTypes.USER_SETTINGS_UPDATE_LOADED
    });
}
