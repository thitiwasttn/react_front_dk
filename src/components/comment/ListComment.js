import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {getUserProfile} from "../feed/FeedService";

const ListComment = (props) => {

    const [profileState, setProfileState] = useState({});

    async function loadProfile() {

        let user_profile = {};
        await getUserProfile(props.data.comment_by.user_profile).then(value => {
            user_profile = value.data;
            setProfileState(value.data);
        })

    }

    useEffect(() => {
        loadProfile()
    }, [])


    const getDivProfile = (user_profile) => {
        let ret = (<></>);
        if (user_profile.id) {
            ret = (
                <div>
                    <img key={user_profile.id + user_profile.name} className={"rounded image_size_small"}
                         src={process.env.REACT_APP_IMAGE_URL + user_profile.image_profile.formats.small.url}
                         alt={user_profile.name}/>
                    <span className={"margin_left"}>
                                {user_profile.first_name} {user_profile.last_name}
                            </span>
                </div>);
        }
        return ret;
    };

    return (
        <div className="card margin-top">
            <div className="card-header">
                {getDivProfile(profileState)}
            </div>
            <div className="card-body">
                <p className="card-text">{props.data.detail}</p>
            </div>
        </div>
    );
}

export default connect()(ListComment)