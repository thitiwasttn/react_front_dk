import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const Post = (props) => {
    const navigate = useNavigate();
    const getDivProfile = user_profile => {
        console.log('user_profile >>', user_profile);
        let ret = (<></>);
        let attributes = user_profile.attributes;
        let image = attributes.image_profile.data.attributes;
        ret = (
            <div>
                <img key={user_profile.id + attributes.name} className={"rounded image_size_small"}
                     src={process.env.REACT_APP_IMAGE_URL + image.formats.small.url}
                     alt={attributes.name}/>
                <span className={"margin_left"}>
                                {attributes.first_name} {attributes.last_name}
                            </span>
            </div>);


        return ret;
    };

    const imageDiv = (image) => {
        let ret = (<></>)
        if (image.mime.includes('image')) {

            let imageURl = process.env.REACT_APP_IMAGE_URL + image.url;
            ret = (
                <img key={image.id + "_" + image.name} className={"rounded image_size margin_left"}
                     src={imageURl} alt={image.name}/>
            );
        }
        return ret;
    };

    const likeDisplay = likes => {
        let message = '';
        message = likes === 0 ? 'No like' : likes + ' Likes';
        return (
            <>{message}</>
        );
    };

    useEffect(() => {
        // console.log('props.data.post_by ', props.data.post_by);
    }, [])
    return (
        <div className={"margin5"} key={props.data.id}>
            <div className={"card"}>
                <div className={"card-header"}>
                    {getDivProfile(props.data.post_by.user_profile)}
                </div>
                <div className={"card-body"}>
                    <h5 className={"card-title"}>
                        <a onClick={() => {
                            navigate(`/post/${[props.data.id]}`)
                        }} className="link-secondary">{props.data.title}</a>
                    </h5>
                    <p className={"card-text"}>
                        {props.data.detail}
                    </p>
                </div>
                <div className={"text-center"}>
                    {props.data.image.map(value => (
                        imageDiv(value)
                    ))}
                </div>
                <div className={"card-footer text-muted margin5"}>
                    {likeDisplay(props.data.likes)}
                </div>
            </div>
        </div>
    );
}

export default Post;