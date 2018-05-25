import { ActionTypes } from './loader-actions';

const initialState = {
    isLoaderShown: false
};

export default function loaderReducer(state = initialState, action) {
    switch (action.type) {
    case ActionTypes.TOGGLE_LOADER:
        return Object.assign({}, state, {
            isLoaderShown: action.payload
        });
    default:
        return state;
    }
}
