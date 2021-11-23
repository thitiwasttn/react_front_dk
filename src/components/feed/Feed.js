import React, {useEffect, useState} from "react";
import {getFeed} from "./FeedService";
import './Feed.css'

const Feed = (props) => {
    let posts = [];
    const [postState, setPostStete] = useState(posts);
    const loadFeed = () => {
        getFeed().then(value => {
            let temp = [...posts];
            temp.push(...value.data);
            setPostStete(temp)
        })
    }

    useEffect(() => {
        loadFeed();
    }, []);


    const imageDiv = (image) => {
        console.log(image);
        let imageURl = process.env.REACT_APP_IMAGE_URL + image.formats.medium.url;
        return (<div key={image.id}>
            <img className={"rounded image_size"}
                 src={imageURl} alt={image.name}/>
        </div>)
    };

    const likeDisplay = likes => {
        let message = '';
        if (likes === 0) {
            message = 'No like'
        } else {
            message = likes + ' Likes';
        }
        return (
            <>
                {message}
            </>
        );
    };

    return (
        <div>
            {postState.map((value, index) => (
                <div className={"margin5"} key={value.id}>
                    <div className={"card"}>
                        <div className={"card-body"}>
                            <h5 className={"card-title"}>{value.title}</h5>
                            <p className={"card-text"}>
                                {value.detail}
                            </p>
                        </div>
                        <div className={"text-center"}>
                            {value.image.map(value => (
                                imageDiv(value)
                            ))}
                        </div>
                        <div className={"card-footer text-muted margin5"}>
                            {likeDisplay(value.likes)}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Feed;