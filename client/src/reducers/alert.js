// import { SET_ALERT,REMOVE_ALERT } from "../actions/types";

// const initialState = [];


//  const alertReducer=  function (state = initialState, action) {
//     const { type, payload } = action;
//     switch (type) {
//         case SET_ALERT:
//             return [...state, payload];
//         case REMOVE_ALERT:
//             return state.filter(alert => alert.id !== payload);
//         default:
//             return state;
//     }
// }
// export default alertReducer;



import { SET_ALERT, REMOVE_ALERT, REMOVE_ALERT_BY_MESSAGE } from "../actions/types";

const initialState = [];

const alertReducer= function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case SET_ALERT:
            return [...state, payload];
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== payload);
        case REMOVE_ALERT_BY_MESSAGE:
            const messageToRemove = payload;
            //console.log(messageToRemove);
            return state.filter(alert => alert.msg !== messageToRemove);
        default:
            return state;
    }
}
export default alertReducer;
