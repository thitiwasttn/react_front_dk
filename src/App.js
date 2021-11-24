import {connect} from 'react-redux';
import './App.css';
import Header from "./components/Header";
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import React, {useState, useEffect} from "react";
import Feed from "./components/feed/Feed";
import Profile from "./components/profile/Profile";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Post from "./components/post/Post";
import ViewPost from "./components/view-post/ViewPost";

function App(props) {
    const [stateName, setStateName] = useState('Login')
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState({});

    function updateUser() {
        if (props.tokenStore.user) {
            setIsLogin(true)
            setStateName(getFirstNameLastName(props.tokenStore.user.user_profile));
            setUser(props.tokenStore.user);
        } else {
            setIsLogin(false);
        }
    }

    useEffect(() => {
        updateUser();
    }, [])

    function updateText(user, loginStatus) {
        console.log('text >>>', user, 'loginStatus >>', loginStatus);
        if (loginStatus) {
            setUser(user);
            setStateName(getFirstNameLastName(user.user_profile))
        } else {
            setStateName('Login')
        }
        setIsLogin(loginStatus)
    }

    function getFirstNameLastName(user_profile) {
        return user_profile.first_name + " " + user_profile.last_name;
    }

    return (
        <div>
            <div>
                <BrowserRouter>
                    <Header name={stateName} isLogin={isLogin} user={user}/>
                    <div className={"container"}>
                        <Routes>
                            <Route path={"*"} element={<Feed/>}/>
                            <Route path={""} element={<Feed/>}/>
                            <Route path={"feed"} element={<Feed/>}/>
                            <Route path={"profile"} element={<Profile test={updateText.bind(this)}/>}/>
                            <Route path={"profile/:id"} element={<Profile test={updateText.bind(this)}/>}/>
                            <Route path={"login"} element={<Login test={updateText.bind(this)}/>}/>
                            <Route path={"register"} element={<Register/>}/>
                            <Route path={"post/:id"} element={<ViewPost/>}/>
                        </Routes>
                    </div>
                </BrowserRouter>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        tokenStore: state.tokenReducer
    }
}

export default connect(mapStateToProps, null)(App);
