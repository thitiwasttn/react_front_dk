import {ADD_TOKEN, GET_TOKEN} from "../constant/actionType";

const initState = {
    token: 'dadwadad'
}
const tokenReducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_TOKEN:
            return {
                ...state,
                token: action.payload
            }
        default:
            break;
    }
    return state;
}

export default tokenReducer;