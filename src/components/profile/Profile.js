import React, {useState, useEffect} from "react";
import {ADD_TOKEN, DEL_TOKEN} from "../../constant/actionType";
import {connect} from "react-redux";
import {useNavigate} from 'react-router-dom';
import {getUser, getUserId} from "./ProfileService";
import {getUserProfile} from "../feed/FeedService";
import './Profile.css'
import {getUserRole} from "../service/roleService";

const Profile = (props) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [profile, setProfile] = useState({});
    const [isReady, setReady] = useState(false);
    const [roles, setRoles] = useState([]);
    const [userFull, setUserFull] = useState([]);

    function loadUserId(id) {
        getUserId(id).then(value => {
            setUserFull(value.data);
            setProfile(value.data.user_profile)
        })
        loadRole(id)
    }

    useEffect(() => {
        if (!props.tokenStore.token) {
            logout();
        }
        getUser(props.tokenStore.token).then(value => {
            setUser(value.data);
            loadUserId(value.data.id)

        })

    }, [])

    function logout() {
        props.del_token();
        navigate('/login')
    }

    function loadRole(user_id) {
        getUserRole(user_id).then(value => {
            setRoles(value.data);
        })
    }

    const profileDiv = () => {
        let ret = (<></>);
        if (profile.id !== undefined) {
            ret = (
                <div className={"row"}>
                    <div className={"col-12"}>
                        <img className={"rounded-circle image_profile"}
                             src={process.env.REACT_APP_IMAGE_URL + profile.image_profile.formats.medium.url}
                             alt={profile.name}/>
                    </div>
                    <div className={"col-12"} style={{marginTop: "50px"}}>
                        <div className={"row"}>
                            <div className={"col-6 text-right"}>
                                <strong>name</strong>
                            </div>
                            <div className={"col-6 text-left"}>
                                {profile.first_name} {profile.last_name}
                            </div>
                        </div>
                        <div className={"row margin-top"}>
                            <div className={"col-6 text-right"}>
                                <strong>work address </strong>
                            </div>
                            <div className={"col-6 text-left"}>
                                {profile.work_address}
                            </div>
                        </div>
                        <div>
                            {roles.map(value => {
                                return (
                                    <div className={"row"} key={value.id}>
                                        <div className={"col-6 text-right"}>
                                            <strong>ประเภท</strong>
                                        </div>
                                        <div className={"col-6 text-left"}>
                                            {value.role_name}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div>
                            {userFull.sp_roles.map(sp => {
                                return (
                                    <div key={sp.id} className={"row"}>
                                        <div className={"col-6 text-right"}>
                                            <strong>เฉพาะทาง </strong>
                                        </div>
                                        <div className={"col-6 text-left"}><span>{sp.name} </span></div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            );
        }
        return ret;
    }
    return (
        <div className={"row text-center margin-top"}>
            {profileDiv()}
            <div className={"margin-top"}>
                <button onClick={logout} className={"btn btn-danger"}>
                    logout
                </button>
            </div>
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