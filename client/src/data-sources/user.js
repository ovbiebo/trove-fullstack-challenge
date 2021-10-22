import {get, patch, post} from "../utils/xhr";

const signIn = async (email, password) => {
    return post("/auth", {email, password})
        .then((userTokens) => {
            return userTokens.data;
        })
        .catch((error) => {
            throw error.code
        });
}

const signUp = async (firstName, lastName, email, password) => {
    return post("/users", {firstName, lastName, email, password})
        .then((userTokens) => {
            return userTokens.data;
        })
        .catch((error) => {
            throw error.code
        });
}

const getUserDetails = async (userId) => {
    return get(`/users/${userId}`)
        .then((userDetails) => {
            return userDetails.data;
        })
        .catch((error) => {
            throw error.code
        });
}

const editProfile = async (userId, updates) => {
    return patch(`/users/${userId}`, updates)
        .catch((error) => {
            throw error.code
        });
}

const changePassword = async (userId, updates) => {
    return patch(`/users/${userId}/password`, updates)
        .catch((error) => {
            throw error.code
        });
}

export {signIn, signUp, getUserDetails, editProfile, changePassword}
