import React, {useEffect, useState} from "react";
import {getFeed, getUserProfile} from "./FeedService";
import './Feed.css'
import PostInput from "../postInput/PostInput";
import Post from "../post/Post";

const Feed = (props) => {
    const [postState, setPostStete] = useState([]);
    const [profile, setProfile] = useState([]);


    const loadFeed = async () => {
        await getFeed().then(async (value) => {
            // let temp = [...postState];
            // temp.push(...value.data);
            /*value.data.map(x => {
                getProfileV2(x.post_by.user_profile)
            })*/
            for (let datum of value.data) {
                await getProfileV2(datum.post_by.user_profile)
            }
            await setPostStete(value.data)
        })

    }

    const profileTest = [];

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
                console.log('value.data.id >>', value.data.id);
                let tempState = [...profile];
                tempState.push(value.data);
                setProfile(tempState)
                console.log('profile >>', profile);
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
                    let ret = (
                        <div></div>
                    );
                    profile.map(value1 => {
                        if (value.post_by.user_profile === value1.id) {
                            ret = (<Post key={value.id + "_" + value.title}
                                         profilex={value1}
                                         data={value}
                            />);
                        }
                    })
                    return ret;
                })
            }
        </div>
    )
}

export default Feed;