import React, {useState} from "react";


const ProfileInput = (props) => {
    const [profile, setProfile] = useState({
        user_profile: {
            work_address: '',
            first_name: '',
            last_name: '',
            image_profile: ''
        }
    });

    const imageRef = React.createRef();

    function userChange(event) {
        let tempState = {...profile}
        tempState.user_profile[event.target.name] = event.target.value;
        setProfile(tempState);
    }

    async function next() {
        console.log('next >>', profile);
        await props.setProfile(profile);
        await props.setStateNumber();
    }

    function onFile(event) {

    }


    return (
        <div>
            <div className={"col-6 mt-5 mx-auto card"}>
                <div className={"card-body"}>
                    <form>
                        <div className={"form-group"}>
                            <label htmlFor="email">work address</label>
                            <input
                                type="text"
                                className={"form-control"}
                                id={"work_address"}
                                name={"work_address"}
                                onChange={userChange}
                            />
                        </div>

                        <div className={"form-group"}>
                            <label htmlFor="first_name">first name</label>
                            <input
                                type="text"
                                className={"form-control"}
                                id={"first_name"}
                                name={"first_name"}
                                onChange={userChange}
                            />
                        </div>

                        <div className={"form-group"}>
                            <label htmlFor="last_name">last name</label>
                            <input
                                type="text"
                                className={"form-control"}
                                id={"last_name"}
                                name={"last_name"}
                                onChange={userChange}
                            />
                        </div>

                        <div className={"form-group"}>
                            <label htmlFor="image">images</label>
                            <input type="file" className={"form-control"}
                                   id="image"
                                   name={"image"}
                                   ref={imageRef}
                                   onChange={onFile}/>
                        </div>

                        <div className={"text-center"}>
                            <button
                                type={"button"}
                                className={"btn my-1"}
                                onClick={next}>
                                next
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default (ProfileInput);