import React, {useState, useEffect} from "react";
import {ADD_TOKEN, DEL_TOKEN, DEL_USER} from "../../constant/actionType";
import {connect} from "react-redux";
import {useNavigate} from 'react-router-dom';
import {getUser, getUserId} from "./ProfileService";
import {getUserProfile} from "../feed/FeedService";
import './Profile.css'
import {getUserRole} from "../service/roleService";
import {useParams, useLocation} from "react-router-dom";

const Profile = (props) => {
    const params = useParams();
    const location = useLocation();
    const id = params.id;
    const navigate = useNavigate();
    const [profile, setProfile] = useState({});
    const [roles, setRoles] = useState([]);
    const [userFull, setUserFull] = useState([]);

    function loadUserId(id) {
        getUserId(id).then(value => {
            setUserFull(value.data);
            setProfile(value.data.user_profile)
            setRoles(value.data.role_customs);
        })
        // loadRole(id)
    }

    useEffect(() => {
        if ((!id || !props.tokenStore.token)) {
            logout();
        }
        if (props.tokenStore.user) {
            loadUserId(id)
        }
    }, [])

    function logout() {
        props.test(null, false);
        props.del_token();
        props.del_user();
        navigate('/login')
    }

    /*function loadRole(user_id) {
        getUserRole(user_id).then(value => {
            setRoles(value.data);
        })
    }*/

    const profileDiv = () => {
        let ret = (<></>);
        if (profile.id !== undefined) {
            ret = (
                <div className={"row"} style={{marginTop: "50px"}}>
                    <div className={"col-12"}>
                        <img className={"rounded-circle image_profile"}
                             src={process.env.REACT_APP_IMAGE_URL + profile.image_profile.url}
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
                    <div className={""} style={{marginTop: "50px"}}>
                        <button onClick={logout} className={"btn btn-danger"}>
                            logout
                        </button>
                    </div>
                </div>
            );
        }
        return ret;
    }
    return (
        <div className={"row text-center margin-top"}>
            {profileDiv()}

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
        },
        del_user: () => {
            return dispatch({type: DEL_USER})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);