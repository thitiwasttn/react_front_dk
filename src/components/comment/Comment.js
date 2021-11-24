import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import './Comment.css'
import {addComment} from "../service/PostService";

const Comment = (props) => {
    const commentRef = React.createRef();

    const [canComment, setCanComment] = useState(false);

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

    useEffect(() => {
        if (props.tokenStore.token) {
            setCanComment(true);
        } else {
            setCanComment(false);
        }
    }, [])

    return (
        <div>
            <div className="form-group">
                <label htmlFor="comments">comment</label>
                <textarea disabled={!canComment} className="form-control" ref={commentRef} id="comments" rows="3"/>
            </div>

            <div className={"text-right margin-top"}>
                <button disabled={!canComment}
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