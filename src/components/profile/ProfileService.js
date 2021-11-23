import axios from "axios";
import {ADD_TOKEN, DEL_TOKEN} from "../../constant/actionType";
import configureStore from "../../store";

const {store, persistor} = configureStore()


export const getUser = (token) => {
    // const token = store.getState().tokenReducer.token;
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}users/me`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}