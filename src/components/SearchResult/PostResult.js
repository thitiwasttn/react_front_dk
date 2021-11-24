import React from "react";
import './SearchResult.css'
import {useNavigate} from "react-router-dom";
const PostResult = (props) => {
    const navigate = useNavigate();
    return (
        <div className={"content"}>
            <div className={"card"}>
                <div className={"card-header"}>

                </div>
                <div className={"card-body"}>
                    <h5 className={"card-title"}>
                        <a onClick={() => {
                            navigate(`/post/${props.data.id}`)
                        }} className="link-secondary">{props.data.title}</a>
                    </h5>
                    <p className={"card-text"}>

                    </p>
                </div>
                <div className={"text-center"}>

                </div>
                <div className={"card-footer text-muted margin5"}>

                </div>
            </div>
        </div>
    )
}

export default PostResult;