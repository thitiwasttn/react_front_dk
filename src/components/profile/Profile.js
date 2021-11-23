import React, {useState, useEffect} from "react";
import {ADD_TOKEN, DEL_TOKEN} from "../../constant/actionType";
import {connect} from "react-redux";
import {useNavigate} from 'react-router-dom';
import {getUser} from "./ProfileService";
import {getUserProfile} from "../feed/FeedService";

const Profile = (props) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [profile, setProfile] = useState({});
    const [isReady, setReady] = useState(false);

    useEffect(() => {
        if (!props.tokenStore.token) {
            logout();
        }
        getUser(props.tokenStore.token).then(value => {
            setUser(value.data);
            getUserProfile(value.data.user_profile).then(value1 => {
                setProfile(value1.data)
                setReady(true);
            })

        })
    }, [])

    function logout() {
        props.del_token();
        navigate('/login')
    }

    const profileDiv = () => {
        let ret = (<></>);
        if (profile.image_profile !== undefined) {
            ret = (
                <div>
                    <img className={"rounded"}
                         src={process.env.REACT_APP_IMAGE_URL + profile.image_profile.formats.small.url}
                         alt={profile.name}/>
                </div>
            );
        }
        return ret;
    }
    return (
        <div>
            {profileDiv()}
            <button onClick={logout} className={"btn btn-danger"}>
                logout
            </button>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        tokenStore: state.tokenReducer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        del_token: () => {
            return dispatch({type: DEL_TOKEN})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);