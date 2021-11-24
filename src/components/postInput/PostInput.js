import React, {useEffect, useState} from "react";
import './PostInput.css'
import {connect} from "react-redux";

const PostInput = (props) => {
    const [isLoggin, setIsLoggin] = useState(false);
    const [dataState, setDataState] = useState({
        title: '',
        detail: ''
    });

    useEffect(() => {
        if (props.tokenStore.user) {
            setIsLoggin(true)
        } else {
            setIsLoggin(false)
        }
    }, [])

    function onInputChange(event) {
        let tempState = {...dataState}
        tempState[event.target.name] = event.target.value;
        setDataState(tempState);
    }

    function onClickPost(event) {
        event.preventDefault();
        props.loadFeed();
    }

    return (
        isLoggin ?
            <div className={"shadow p-3 mb-5 bg-white rounded margin-top"}>
                <form>
                    <div className={"form-group"}>
                        <label htmlFor="title">title</label>
                        <input
                            type="text"
                            className={"form-control"}
                            id={"title"}
                            name={"title"}
                            onChange={onInputChange}
                        />
                    </div>
                    <div className={"form-group"}>
                        <label htmlFor="detail">message</label>
                        <textarea
                            className={"form-control"}
                            id={"detail"}
                            name={"detail"}
                            rows="3"
                            onChange={onInputChange}
                        />
                    </div>
                    <div className={"margin-top text-center"}>
                        <button className={"btn btn-outline-success"} onClick={onClickPost}>
                            Post
                        </button>
                    </div>
                </form>
            </div> : <div></div>
    );
}

const mapStateToProps = state => {
    return {
        tokenStore: state.tokenReducer
    }
}


export default connect(mapStateToProps, null)(PostInput);