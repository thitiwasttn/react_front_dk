import {ADD_TOKEN, ADD_USER, DEL_TOKEN, GET_TOKEN} from "../constant/actionType";


const tokenReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_TOKEN:
            return {
                ...state,
                token: action.payload,
            }
        case DEL_TOKEN:
            return {
                ...state,
                token: null
            }
        case ADD_USER:
            return {
                ...state,
                user: action.user
            }
        default:
            break;
    }
    return state;
}

export default tokenReducer;