import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {getUserProfile} from "../feed/FeedService";

const ListComment = (props) => {

    const [profileState, setProfileState] = useState({});

    async function loadProfile() {
        console.log('props.data >>', props.data);
        let user_profile = {};
        await getUserProfile(props.data.comment_by.user_profile).then(value => {
            let data = value.data.data;
            user_profile = data;
            setProfileState(data);
        })

    }

    useEffect(() => {
        loadProfile()
    }, [])


    const getDivProfile = (user_profile) => {
        let ret = (<></>);
        if (user_profile.id) {
            let attributes = user_profile.attributes;
            console.log('attributes >>', attributes);
            let imageProfile = user_profile.attributes.image_profile.data.attributes;
            ret = (
                <div>
                    <img key={user_profile.id + user_profile.attributes.name} className={"rounded image_size_small"}
                         src={process.env.REACT_APP_IMAGE_URL + imageProfile.formats.small.url}
                         alt={user_profile.attributes.name}/>
                    <span className={"margin_left"}>
                                {user_profile.attributes.first_name} {user_profile.attributes.last_name}
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