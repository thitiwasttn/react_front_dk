import React, {useEffect, useState} from "react";
import {getFeed, getUserProfile} from "./FeedService";
import './Feed.css'
import PostInput from "../postInput/PostInput";
import Post from "../post/Post";

const Feed = (props) => {
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
        loadFeed();
    }, []);

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


    const loadFeedPost = () => {
        loadFeed();
    }

    return (
        <div>
            <PostInput loadFeed={loadFeedPost.bind(this)}/>
            {postState.map((value) =>
                <Post key={value.id + "_" + value.title}
                      profile={profile}
                      data={value}
                />)}
        </div>
    )
}

export default Feed;