import { v4 as uuid } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';


export const setAlert = (msg, alertType,timeOut=4000,id) => dispatch => {
    
    if (!id) {
        id = uuid();
    }
    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id }
    });
    //console.log("timeOut:", timeOut);

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }),timeOut); 
};
