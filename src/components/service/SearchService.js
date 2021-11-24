import axios from "axios";

export const getSearch = (message) => {
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}home/search?query=${message}`);
}
