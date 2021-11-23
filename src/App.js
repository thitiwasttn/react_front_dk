import {connect} from 'react-redux';
import './App.css';
import Header from "./components/Header";
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import React from "react";
import Feed from "./components/feed/Feed";
import Profile from "./components/profile/Profile";

function App(props) {
    return (
        <div>
            <div >
                <BrowserRouter>
                    <Header/>
                    <div className={"container"}>
                        <Routes>
                            <Route path={"*"} element={<Feed/>}/>
                            <Route path={""} element={<Feed/>}/>
                            <Route path={"feed"} element={<Feed/>}/>
                            <Route path={"profile"} element={<Profile/>}/>
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
