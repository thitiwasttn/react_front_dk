import React, {useEffect, useState} from "react";
import './PostInput.css'
import {connect} from "react-redux";
import {addPost, uploadFileRef} from "../service/PostService";

const PostInput = (props) => {
    const imageRef = React.createRef();
    const [isLoggin, setIsLoggin] = useState(false);
    const [dataState, setDataState] = useState({
        title: '',
        detail: ''
    });
    const [imageStateFile, setImageStateFile] = useState([]);
    const [imageState, setImageState] = useState([]);
    let isError = false;

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

    function onFile(event) {
        let files = event.target.files;
        let filesArr = Array.prototype.slice.call(files);
        // let tempState = [...imageState];
        let temp = [];
        setImageStateFile(filesArr);
        for (let t of filesArr) {
            let url = URL.createObjectURL(t);
            temp.push(url)
        }
        setImageState(temp);
    }

    async function uploadImage(id) {
        let imageId = [];
        if (imageStateFile.length > 0) {
            for (let imageStateFileElement of imageStateFile) {
                await uploadFileRef(imageStateFileElement, 'post', 'image', id, props.tokenStore.token)
                    .then(value => {
                        imageId.push(value.data[0].id)
                    }).catch(reason => {
                        alert('error upload')
                        isError = true;
                    })
            }
        }
        return imageId;
    }

    async function onClickPost(event) {
        event.preventDefault();
        console.log('before upload');
        let imageIds = await uploadImage(0);
        if (!isError) {
            await addPost(dataState.title,
                dataState.detail,
                props.tokenStore.user.id,
                props.tokenStore.token,
                imageIds).then(value => {
            });
            document.getElementById('image').value = "";
            setImageState([]);
            setImageStateFile([]);

            await props.loadFeed();
        }
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

                    <div className={"form-group"}>
                        <label htmlFor="image">images</label>
                        <input type="file" className={"form-control"}
                               id="image"
                               name={"image"}
                               multiple
                               ref={imageRef}
                               onChange={onFile}/>
                    </div>
                    <div className={"margin-top"}>
                        {imageState.map(value => {
                            return (
                                <img key={value} className={"rounded image_size margin_left"} src={value} alt=""/>
                            )
                        })}
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