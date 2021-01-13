import {
    API_PATH_VERSION,
    DISMISS_ALERT,
    FETCH_FAILURE,
    FETCH_INIT,
    FETCH_SUCCESS,
    FETCH_VERSION,
    SET_ALERT,
    SET_TAB
} from "../constants";
import {fetchGET} from "./fetch";

export const setTab = (tab) => ({type: SET_TAB, tab});

export const errorAlert = (err, action) => ({type: 'danger', alert: {title: err.name, message: err.message, count: 1, action}});

export const setAlert = ({type = 'warning', title = 'Oops!', message = 'There was an error', action}) => ({
    type: SET_ALERT,
    alert: {type, title, message, action, count: 1}
});


/**
 *
 * @param {Error} err
 * @param {String} context
 * @return {{type: string, props: {context: string, type: string, title: *, message: *}}}
 */
export const handleError = (err, context = '') => {
    console.trace(err.message);
    return {
        type: SET_ALERT,
        props: {type: 'danger', title: err.name, message: err.message, context}
    };
};

export const dismissAlert = (id) => ({type: DISMISS_ALERT, id});


export const fetchVersion = () => (dispatch, getState) => {
    const {app} = getState();
    // const {version: loadedVersion} = app;
    dispatch({type: FETCH_VERSION, status: FETCH_INIT});
    fetchGET(API_PATH_VERSION, {cache: 'no-cache'})
        .then(res => {
            const {version} = res;
            dispatch({type: FETCH_VERSION, status: FETCH_SUCCESS, version});
        })
        .catch(err => {
            dispatch({type: FETCH_VERSION, status: FETCH_FAILURE});
            console.log(err.message);
        });
};
