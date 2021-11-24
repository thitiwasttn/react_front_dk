import React, {useState} from "react";
import {connect} from "react-redux";
import {ADD_TOKEN, ADD_USER, DEL_USER} from "../../constant/actionType";
import ProfileInput from "./ProfileInput";
import RoleInput from "./RoleInput";
import {createUserProfile, userRegister} from "../service/RegisterService";

const Register = (props) => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [profile, setProfile] = useState({
        user_profile: {
            work_address: '',
            first_name: '',
            last_name: '',
            image_profile: ''
        }
    });

    const [role, setRole] = useState({
        role_customs: [
            {
                id: ''
            }
        ]
    });

    const [sp_roleState, setSp_roleState] = useState({
        sp_roles: [
            {id: ''}
        ]
    })

    const [stateNumber, setStateNumber] = useState(0);

    function userChange(event) {
        let tempState = {...user}
        tempState[event.target.name] = event.target.value;
        if (event.target.name === 'email') {
            tempState.username = event.target.value;
        }
        setUser(tempState);
    }

    function register() {
        console.log('user >>', user);
        if (stateNumber === 0) {
            setStateNumber(1);
        }
    }

    async function onSetProfile(profile) {
        await setProfile(profile);
    }

    async function handleSetRole(rolex, sp_role) {
        await setRole({
            role_customs: {
                id: rolex
            }
        })

        // let tempState = [...sp_roleState.sp_roles]
        let temp = []
        for (let spRoleElement of sp_role) {
            temp.push({
                id: spRoleElement
            })
        }
        await setSp_roleState({
            sp_roles: temp
        })

        await userRegister(user, role, sp_roleState).then(async (value) => {
            profile.user_profile.user = value.data.user.id
            await createUserProfile(profile.user_profile, value.data.jwt).then(value1 => {
                console.log(value1.data);
            })
        })
    }

    const inputView = () => {
        let ret = (<></>)
        if (stateNumber === 0) {
            ret = (
                <div>
                    <div className={"col-6 mt-5 mx-auto card"}>
                        <div className={"card-body"}>
                            <form>
                                <div className={"form-group"}>
                                    <label htmlFor="email">email</label>
                                    <input
                                        type="text"
                                        className={"form-control"}
                                        id={"email"}
                                        name={"email"}
                                        onChange={userChange}
                                    />
                                </div>

                                <div className={"form-group"}>
                                    <label htmlFor="password">password</label>
                                    <input
                                        type="password"
                                        className={"form-control "}
                                        id={"password"}
                                        name={"password"}
                                        onChange={userChange}
                                    />
                                </div>
                                <div className={"text-center"}>
                                    <button
                                        type={"button"}
                                        className={"btn my-1"}
                                        onClick={register}>
                                        register
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            );
        } else if (stateNumber === 1) {
            ret = (<ProfileInput profile={profile} setProfile={onSetProfile.bind(this)}
                                 setStateNumber={setStateNumber.bind(this, 2)}/>)
        } else if (stateNumber === 2) {
            ret = (<RoleInput handleSetRole={handleSetRole.bind(this)}/>)
        }

        return ret;
    }
    return (inputView())
}


const mapStateToProps = state => {
    return {
        tokenStore: state.tokenReducer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addToken: (token) => {
            return dispatch({type: ADD_TOKEN, payload: token})
        },
        addUser: (user) => {
            return dispatch({type: ADD_USER, user: user})
        },
        delUser: () => {
            return dispatch({type: DEL_USER})
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Register);