import axios from "axios";

export const addPost = (title, detail, post_by, token) => {
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}posts`, {
        title: title,
        detail: detail,
        post_by: post_by,
        status: true
    }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}