import React from "react";

const Post = (props) => {
    const getDivProfile = user_profile => {
        let ret = (<></>);
        for (let value of props.profile) {
            if (value.id === user_profile) {
                ret = (
                    <div>
                        <img key={value.id + value.name} className={"rounded image_size_small"}
                             src={process.env.REACT_APP_IMAGE_URL + value.image_profile.formats.small.url}
                             alt={value.name}/>
                        <span className={"margin_left"}>
                            {value.first_name} {value.last_name}
                        </span>
                    </div>
                )
                break;
            }
        }
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