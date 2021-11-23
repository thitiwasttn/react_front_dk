import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {ADD_TOKEN, ADD_USER, DEL_USER} from "../../constant/actionType";
import {login} from "./LoginService";
import {useNavigate} from 'react-router-dom';

const Login = (props) => {

    const navigate = useNavigate();

    useEffect(() => {
        if (props.tokenStore.token) {
            navigate(`/profile/${props.tokenStore.user.id}`)
        }
    }, [])
    const [state, setState] = useState({
        username: '',
        password: ''
    });

    const onInputChange = (event) => {
        let tempState = {...state}
        tempState[event.target.name] = event.target.value;
        setState(tempState);
    };


    const onSubmit = async () => {
        login(state.username, state.password).then(value => {
            props.addToken(value.data.jwt);
            props.addUser(value.data.user);
            navigate(`/profile/${value.data.user.id}`)
        })

    };

    return (
        <div className={"col-6 mt-5 mx-auto card"}>
            <div className={"card-body"}>
                <form>
                    <div className={"form-group"}>
                        <label htmlFor="username">User Name</label>
                        <input
                            type="text"
                            className={"form-control"}
                            id={"username"}
                            name={"username"}
                            onChange={onInputChange}
                        />
                    </div>
                    <div className={"form-group"}>
                        <label htmlFor="password">password</label>
                        <input
                            type="password"
                            className={"form-control "}
                            id={"password"}
                            name={"password"}
                            onChange={onInputChange}
                        />
                    </div>
                    <div className={"text-center"}>
                        <button
                            type={"button"}
                            className={"btn my-1"}
                            onClick={onSubmit}
                        >
                            login
                        </button>

                        <button
                            type={"button"}
                            className={"btn my-1"}
                            onClick={onSubmit}
                        >
                            register
                        </button>
                    </div>
                </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);