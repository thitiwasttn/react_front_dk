import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {useParams} from "react-router-dom";
import {findPost} from "../service/PostService";
import Post from "../post/Post";
import {getUserProfile} from "../feed/FeedService";
import Comment from "../comment/Comment";
import ListComment from "../comment/ListComment";

const ViewPost = (props) => {
    const params = useParams();
    const post_id = params.id;
    const [canComment, setCanComment] = useState(false);
    const [postState, setPostState] = useState([]);

    async function loadPost() {
        let tempPost = {};
        await findPost(post_id).then(value => {
            tempPost = value.data;
        })
        let tempProfile = {};
        await getUserProfile(tempPost.post_by.user_profile).then(value => {
            tempProfile = value.data.data;
        })
        tempPost.post_by.user_profile = tempProfile;
        let tempArr = [];
        tempArr.push(tempPost);
        setPostState(tempArr);
    }

    const handelLoadPost = () => {
        console.log('handelLoadPost ');
        loadPost()
    }

    useEffect(() => {
        loadPost()
        if (props.tokenStore.token) {
            setCanComment(true);
        } else {
            setCanComment(false);
        }
    }, [])

    return (
        <div>
            {
                postState.map(value => {
                    return (
                        <div key={value.id}>
                            <Post data={value}/>
                            {value.comments.map(value2 => {
                                return (
                                    <ListComment key={value2.id}
                                                 data={value2}
                                    />
                                )
                            })}
                        </div>);
                })
            }
            <Comment loadPost={handelLoadPost.bind(this)} postId={post_id}/>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        tokenStore: state.tokenReducer
    }
}


export default connect(mapStateToProps, null)(ViewPost);