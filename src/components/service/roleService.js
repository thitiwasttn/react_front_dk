import axios from "axios";

export const getUserRole = (user_id) => {
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}role-customs?users=${user_id}`);
}

export const getRoles = () => {
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}role-customs`);
}