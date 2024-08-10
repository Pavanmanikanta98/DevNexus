import axios from "axios";
import {
    GET_POSTS, POST_ERROR,
    UPDATE_LIKES, DELETE_POST,
    ADD_POST, GET_POST,
    ADD_COMMENT,
    REMOVE_COMMENT
} from "./types";
import { setAlert } from './alert';


//get posts
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts');

        dispatch({
            type: GET_POSTS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Add like
export const addLike = (postId) => async (dispatch) => {
    try {
        const res = await axios.put(`/api/posts/like/${postId}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { postId, likes: res.data }
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// REmove like
export const removeLike = (postId) => async (dispatch) => {
    try {
        const res = await axios.put(`/api/posts/unlike/${postId}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { postId, likes: res.data }
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


// Delete post
export const deletePost = (id) => async (dispatch) => {
    try {
        await axios.delete(`/api/posts/${id}`);

        dispatch({
            type: DELETE_POST,
            payload: id
        });

        dispatch(setAlert('Post Removed', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


// ADd post
export const addPost = FormData => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    try {
        const res=await axios.post('/api/posts/',FormData,config);

        dispatch({
            type: ADD_POST,
            payload: res.data
        });

        dispatch(setAlert('Post Added', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


export const getPost = (id)=> async dispatch => {
    try {
        const res = await axios.get(`/api/posts/${id}`);
        dispatch({
            type: GET_POST,
            payload:res.data
        })
        
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload:{msg:err.message.statusText,status:err.response.status}
        })
        
    }
}





// ADd Comment
export const addComment = ( postId,FormData ) => async (dispatch) => {
    console.log(postId);
    console.log(FormData);
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res=await axios.post(`/api/posts/comments/${postId}`,FormData,config);
        
        dispatch({
            type: ADD_COMMENT,
            payload:res.data
        });

        dispatch(setAlert('Comment Added', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


// delete Comment
export const deleteComment = ( postId,commentId) => async (dispatch) => {
    
    try {

        await axios.delete(`/api/posts/comments/${postId}/${commentId}`);

        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        });
        dispatch(setAlert('Comment Removed', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

