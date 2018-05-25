export const ActionTypes = {
    TOGGLE_LOADER: 'TOGGLE_LOADER'
};

export function toggleLoader(dispatch, payload) {
    dispatch({
        type: ActionTypes.TOGGLE_LOADER,
        payload
    });
}
