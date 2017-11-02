import actionTypes from './actionTypes';
import ajax from './ajax';

export const locationChange = (location) => {
    return {
        type: actionTypes.LOCATION_CHANGE,
        location: location,
    }
}

const loading = (fetching) => {
    return {
        type: actionTypes.LOADING,
        fetching,
    }
}

const listLoaded = () => {
    return {
        type: actionTypes.LIST_LOADED,
    }
}

const listDataLoaded = (response) => {
    return {
        type: actionTypes.LIST_DATA_LOADED,
        response: response,
    }
}

const itemLoaded = () => {
    return {
        type: actionTypes.ITEM_LOADED,
    }
}

const itemDataLoaded = (response) => {
    return {
        type: actionTypes.ITEM_DATA_LOADED,
        response: response,
    }
}

export const list = () => {
    return (dispatch, getState) => {
        const state = getState();

        if (state.list) {
            dispatch(listLoaded());
        } else {
            dispatch(loading(true));
            ajax.get('api/contact')
                .then((response) => {
                    dispatch(listDataLoaded(response));
                    dispatch(listLoaded());
                    dispatch(loading(false));
                })
                .catch((err) => {
                    alert(err);
                });
        }
    }
}

export const getById = (id) => (dispatch, getState) =>
    new Promise((resolve, reject) => {
        const state = getState();

        if (state.contacts && state.contacts[id]) {
            dispatch(itemLoaded());
        } else {
            dispatch(loading(true));
            ajax.get(`api/contact/${id}`)
                .then((response) => {
                    dispatch(itemDataLoaded(response));
                    dispatch(itemLoaded());
                    dispatch(loading(false));
                    resolve(response);
                })
                .catch((err) => {
                    alert(err);
                    reject(response);
                });
        }
    })

export const save = (contact, id) => (dispatch) =>
    new Promise((resolve, reject) => {
        dispatch(loading(true));
        ajax.post(`api/contact/${id}`, contact)
            .then((response) => {
                dispatch(itemDataLoaded(response));
                dispatch(itemLoaded());
                dispatch(loading(false));
                resolve(contact);
            })
            .catch((err) => {
                alert(err);
                reject();
            });
    })
