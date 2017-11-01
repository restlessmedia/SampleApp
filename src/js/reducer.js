import actionTypes from './actionTypes';

const arrayToObj = (arr, key) => {
    const obj = {};
    for (var i = 0; i < arr.length; ++i) {
        obj[arr[i][key]] = arr[i];
    }
    return obj;
}

export default function (state = {}, action) {
    let newState;

    switch (action.type) {
        case actionTypes.LOCATION_CHANGE:
            newState = Object.assign({}, state);
            newState.location = action.location;
            return newState;
        case actionTypes.LOADING:
            newState = Object.assign({}, state);
            newState.fetching = action.fetching;
            return newState;
        case actionTypes.LIST_DATA_LOADED:
            newState = Object.assign({}, state);
            newState.contacts = arrayToObj(action.response, 'contactId');
            return newState;
        case actionTypes.ITEM_DATA_LOADED:
            newState = Object.assign({}, state);
            newState.contacts = newState.contacts || {};
            newState.contacts[action.response.contactId] = action.response;
            return newState;
    }

    return state;
}