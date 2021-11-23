import axios from "axios";

export const getFeed = () => {
    return axios.get(`http://61.19.242.56:1337/posts/findFeed`)
        .then(res => {
            console.log('res.data', res.data);
        })
}
