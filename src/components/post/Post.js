import React from "react";

const Post = (props) => {
    const getDivProfile = user_profile => {
        let ret = (<></>);
        ret = (
            <div>
                <img key={props.profilex.id + props.profilex.name} className={"rounded image_size_small"}
                     src={process.env.REACT_APP_IMAGE_URL + props.profilex.image_profile.formats.small.url}
                     alt={props.profilex.name}/>
                <span className={"margin_left"}>
                            {props.profilex.first_name} {props.profilex.last_name}
                        </span>
            </div>
        )
        return ret;
    };

    const imageDiv = (image) => {
        let ret = (<></>)
        if (image.mime.includes('image')) {

            let imageURl = process.env.REACT_APP_IMAGE_URL + image.formats.small.url;
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
    return (
        <div className={"margin5"} key={props.data.id}>
            <div className={"card"}>
                <div className={"card-header"}>
                    {getDivProfile(props.data.post_by.user_profile)}
                </div>
                <div className={"card-body"}>
                    <h5 className={"card-title"}>{props.data.title}</h5>
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