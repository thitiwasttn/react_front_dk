import axios from "axios";

export const getFeed = () => {
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}posts/findFeed`)
        .then(res => {
            console.log('res.data', res.data);
        })
}
