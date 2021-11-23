import axios from "axios";

export const getFeed = () => {
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}posts/findFeed`);
}


export const getUserProfile = (id) => {
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}user-profiles/${id}`);
}
