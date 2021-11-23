import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {ADD_TOKEN} from "../../constant/actionType";
import {login} from "./LoginService";

const Login = (props) => {

    useEffect(() => {
        console.log(props.tokenStore);
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
        console.log('a');
        /*login(state.username, state.password).then(value => {
            console.log(value);
            props.addToken(value.data.jwt);
            console.log(props.tokenStore);
        })*/
        await props.addToken('okgeorgkoergkpo');
        console.log('b');
        console.log(await props.tokenStore);
        console.log('c');
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
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);