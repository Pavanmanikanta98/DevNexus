import axios from "axios";

import {
    ACCOUNT_DELETED, GET_PROFILE,
    PROFILE_ERROR, GET_PROFILES,
    UPDATE_PROFILE, PROFILE_CLEAR,
    GET_REPOS
} from "./types";
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
//get all users profile
export const getProfiles = () => async dispatch => {
    dispatch({ type: PROFILE_CLEAR });
    try {
        const res = await axios.get('/api/profile');
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.status }
        });
    }
};
//get profile by id
export const getProfileById = userId => async dispatch => {

    try {
        const res = await axios.get(`/api/profile/user/${userId}`);
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

//get all git repos
export const getGitRepos = username=> async dispatch => {

    try {
        const res = await axios.get(`/api/profile/github/${username}`);
        dispatch({
            type: GET_REPOS,
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

//Add experience

export const addExperience = (FormData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('/api/profile/experience', FormData, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert('Experience added', 'success'));
        history('/dashboard');
    
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


//Add Education

export const addEducation = (FormData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('/api/profile/education', FormData, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert('Education added', 'success'));
        history('/dashboard');
    
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

//Rempve Experience

export const deleteExperience = (id) => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert('Experienced Deleted', 'SUCCESS'));
    } catch (err) {
        if (err.response) {
            const { errors } = err.response.data;
            if (errors) {
                errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            }
            
        } else {
            
            console.error('Network error:', err.message);
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
};

//remove Education

export const deleteEducation = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/education/${id}`)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert('Education Deleted', 'SUCCESS'));
    } catch (err) {
        if (err.response) {
            const { errors } = err.response.data;
            if (errors) {
                errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            }
            
        } else {
            
            console.error('Network error:', err.message);
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
};

//Delete account & profile

export const deleteAccount = () => async dispatch => {
    if (window.confirm('Are you sure?  This can NOT be undone:(')) {
        
    try {
        await axios.delete('/api/profile')
        dispatch({ type: PROFILE_CLEAR });
        dispatch({ type: ACCOUNT_DELETED });
        dispatch(setAlert('YOUR ACCOUNT HAS BEEN PERMANENTLY DELETED :{ ', 'danger'));
    } catch (err) {
        if (err.response) {
            const { errors } = err.response.data;
            if (errors) {
                errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            }
            
        } else {
            
            console.error('Network error:', err.message);
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
    }
};

