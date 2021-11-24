import React, {useEffect} from "react";
import './SearchResult.css'
import PostResult from "./PostResult";

const SearchResult = (props) => {
    useEffect(() => {
        console.log('props.data >>', props.data);
    }, [])
    return (
        <div className={"content"}>
            {props.data.posts.map(value => {
                return (
                    <PostResult key={value.id} data={value}/>
                )
            })}
        </div>
    )

}

export default SearchResult;