import axios from "axios";

export const login = (userName,password) => {
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}auth/local`, {
        "identifier": userName,
        "password" : password
    });
}