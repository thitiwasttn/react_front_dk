import axios from "axios";

export const userRegister = (user, role, sp_role) => {
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}auth/local/register`, {
        username: user.username,
        email: user.email,
        password: user.password,
        role_customs: role.role_customs,
        sp_roles: sp_role.sp_roles
    });
}

export const createUserProfile = async (profile, token) => {
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}user-profiles`, {
        first_name: profile.first_name,
        last_name: profile.last_name,
        work_address: profile.work_address,
        users_permissions_user: profile.user
    }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}


export const updateImage = async (imageId, token, profileId) => {
    return axios.put(`${process.env.REACT_APP_BACKEND_URL}user-profiles/${profileId}`, {
        image_profile: imageId
    }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}