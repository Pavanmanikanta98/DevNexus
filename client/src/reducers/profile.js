import { GET_PROFILE, PROFILE_ERROR,PROFILE_CLEAR } from "../actions/types";

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
};


const dashboardReducer = function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            };
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case PROFILE_CLEAR:
            return {
                ...state,
                profile: null,
                repos: [],
                loading:false
            }
        default:
            return state;
    }
};

export default dashboardReducer;