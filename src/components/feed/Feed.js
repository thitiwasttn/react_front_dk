import React, {useEffect, useState} from "react";
import {getFeed} from "./FeedService";

const Feed = (props) => {
    useEffect(() => {
        getFeed()
    }, [])
    return (
        <div>
            <h1>FEED</h1>
        </div>
    )
}

export default Feed;