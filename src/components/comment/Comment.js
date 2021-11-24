import React from "react";
import {connect} from "react-redux";
import './Comment.css'
import {addComment} from "../service/PostService";

const Comment = (props) => {
    const commentRef = React.createRef();

    async function onclickComment() {
        // addComment()
        const message = commentRef.current.value;
        const token = props.tokenStore.token;
        document.getElementById("comments").value = '';
        await addComment(message, props.postId, token).then(value => {
            // console.log();
        })
        props.loadPost();
    }

    return (
        <div>
            <div className="form-group">
                <label htmlFor="comments">comment</label>
                <textarea className="form-control" ref={commentRef} id="comments" rows="3"/>
            </div>

            <div className={"text-right margin-top"}>
                <button
                    onClick={onclickComment}
                    className={"btn btn-outline-success"}>
                    comment
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


export default connect(mapStateToProps, null)(Comment);