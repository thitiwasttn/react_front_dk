import React, {useEffect, useState} from "react";
import {getFeed, getUserProfile} from "./FeedService";
import './Feed.css'
import PostInput from "../postInput/PostInput";

const Feed = (props) => {
    let tempProfiles = []
    const [postState, setPostStete] = useState([]);
    const [profile, setProfile] = useState([]);
    const loadFeed = () => {
        getFeed().then(value => {
            // let temp = [...postState];
            // temp.push(...value.data);
            value.data.map(x => {
                getProfile(x.post_by.user_profile)
            })
            setPostStete(value.data)
        })
    }

    useEffect(() => {
        console.log('useEffect');
        loadFeed();
    }, []);


    const imageDiv = (image) => {
        let imageURl = process.env.REACT_APP_IMAGE_URL + image.formats.medium.url;
        return (
            <img key={image.id} className={"rounded image_size margin_left"}
                 src={imageURl} alt={image.name}/>
        )
    };

    const likeDisplay = likes => {
        let message = '';
        message = likes === 0 ? 'No like' : likes + ' Likes';
        return (
            <>{message}</>
        );
    };

    function getProfile(user_profile) {
        let tempProfile = profile.map(value => {
            if (value.id === user_profile) {
                return value;
            }
        });
        if (tempProfile.length === 0) {
            getUserProfile(user_profile).then(value => {
                let tempState = [...profile];
                tempState.push(value.data);
                setProfile(tempState)
            })
        }

    }

    const getDivProfile = user_profile => {
        let ret = (<></>);
        for (let value of profile) {
            if (value.id === user_profile) {
                ret = (
                    <div>
                        <img key={value.id} className={"rounded image_size_small"}
                             src={process.env.REACT_APP_IMAGE_URL + value.image_profile.formats.small.url}
                             alt={value.name}/>
                        <span className={"margin_left"}>
                            {value.first_name} {value.last_name}
                        </span>
                    </div>
                )
                break;
            }
        }
        return ret;
    };




    return (
        <div >
            <PostInput/>
            {postState.map((value) => {
                return (
                    <div className={"margin5"} key={value.id}>
                        <div className={"card"}>
                            <div className={"card-header"}>
                                {getDivProfile(value.post_by.user_profile)}
                            </div>
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
                )
            })}
        </div>
    )
}

export default Feed;