import React, {useEffect, useState} from "react";
import {getFeed, getUserProfile} from "./FeedService";
import './Feed.css'
import PostInput from "../postInput/PostInput";
import Post from "../post/Post";

const Feed = (props) => {
    const [postState, setPostStete] = useState([]);
    const [profile, setProfile] = useState([]);

    const profileTest = [];

    const loadFeed = async () => {
        let temp = [];
        await getFeed().then(value => {
            // let temp = [...postState];
            // temp.push(...value.data);
            /*value.data.map(x => {
                getProfileV2(x.post_by.user_profile)
            })*/
            temp = value.data;
            setPostStete(value.data)
        })

        let newState = [];
        for (let datum of temp) {
            await getProfileV2(datum.post_by.user_profile)
            let find = profileTest.find(value => value.id === datum.post_by.user_profile);
            datum.post_by.user_profile = find;
            newState.push(datum);
        }
        setPostStete(newState)
    }


    useEffect(() => {
        loadFeed();
    }, []);

    async function getProfileV2(profileId) {
        let isHave = false;
        for (let profileTestElement of profileTest) {
            if (profileTestElement.id === profileId) {
                isHave = true;
                break;
            }
        }
        if (!isHave) {
            await getUserProfile(profileId).then(value => {
                profileTest.push(value.data)

                let tempState = [...profile];
                tempState.push(value.data);
                setProfile(tempState)
            })
        }
    }

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
            {
                postState.map(value => {
                    return (<Post
                        key={value.id + "_" + value.title}
                        data={value}/>)
                })
            }
        </div>
    )
}

export default Feed;