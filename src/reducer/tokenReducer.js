import {ADD_TOKEN, ADD_USER, DEL_TOKEN, DEL_USER, GET_TOKEN} from "../constant/actionType";


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
        case DEL_USER:
            return {
                ...state,
                user: null
            }
        default:
            break;
    }
    return state;
}

export default tokenReducer;