import {ADD_TOKEN, DEL_TOKEN, GET_TOKEN} from "../constant/actionType";


const tokenReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_TOKEN:
            return {
                ...state,
                token: action.payload
            }
        case DEL_TOKEN:
            return {
                ...state,
                token: null
            }
        default:
            break;
    }
    return state;
}

export default tokenReducer;