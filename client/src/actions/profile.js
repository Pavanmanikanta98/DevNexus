import axios from "axios";

import { GET_PROFILE, PROFILE_ERROR } from "./types";
import { setAlert } from "./alert";


//get current users profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.status }
        });
    }
};

//create or update profile
export const createProfile = (FormData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('/api/profile', FormData, config);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created','success'));
        if (!edit) {
            history('/dashboard');
        }
    } catch (err) {
        if (err.response) {
            const { errors } = err.response.data;
            if (errors) {
                errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            }
            //console.error(err.response.data); 
        } else {
            
            console.error('Network error:', err.message);
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
        
    }
};