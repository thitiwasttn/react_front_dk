import axios from "axios";

export const addPost = (title, detail, post_by, token, image) => {
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}posts`, {
        title: title,
        detail: detail,
        post_by: post_by,
        status: true,
        image: image
    }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

export const uploadFileRef = (file, ref, field, refId, token) => {
    let bodyFormData = new FormData();
    bodyFormData.append('files', file);
    bodyFormData.append('ref', ref);
    bodyFormData.append('field', field);
    bodyFormData.append('refId', refId);
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}upload/`, bodyFormData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

export const findPost = (id) => {
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}posts/findDetail/${id}`);
}

export const addComment = (message, postId, token) => {
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}comment-posts/comment-post`,
        {
            detail: message,
            post: postId
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
}
