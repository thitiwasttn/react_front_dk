import React, {useState} from "react";
import './PostInput.css'

const PostInput = (props) => {

    const [dataState, setDataState] = useState({
        title: '',
        detail: ''
    });
    function onInputChange(event) {
        let tempState = {...dataState}
        tempState[event.target.name] = event.target.value;
        setDataState(tempState);
    }

    return (
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
                    <label htmlFor="title">message</label>
                    <textarea
                        className={"form-control"}
                        id={"message"}
                        name={"message"}
                        rows="3"
                        onChange={onInputChange}
                    />
                </div>
                <div className={"margin-top text-center"}>
                    <button className={"btn btn-outline-success"}>
                        Post
                    </button>
                </div>
            </form>
        </div>
    );
}

export default PostInput;