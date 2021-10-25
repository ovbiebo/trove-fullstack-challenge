import React, {useEffect} from 'react'
import {changePassword, editProfile, getUserDetails} from "../data-sources/user";
import Layout from "../components/common/layout/layout";
import EditProfileForm from "../components/forms/edit-profile-form";
import ChangePasswordForm from "../components/forms/change-password-form";
import {useUser} from "../state/user/user-context";
import {useStatefulXHR} from "../utils/xhr/useStatefulXHR";
import {LoadingSpinner} from "../components/common/indicators/loadingSpinner";
import {toast} from "react-toastify";

const Profile = () => {
    const [user] = useUser()

    const {data: userDetails, error, makeRequest} = useStatefulXHR();

    useEffect(() => {
        makeRequest(() => getUserDetails(user.id)).then()
    }, [user.id])

    const loading = !userDetails & !error;

    const onPasswordSubmit = async ({oldPassword, newPassword}) => {
        await changePassword(user.id, {email: user.email, password: oldPassword, newPassword})
            .then(()=>toast.success("Password updated successfully"))
            .catch((error)=>toast.error("Password update failed"))
    }

    const onUserDetailsSubmit = async ({firstName, lastName, email}) => {
        await editProfile(user.id, {firstName, lastName, email})
            .then(()=>toast.success("Profile updated successfully"))
            .catch((error)=>toast.error("Profile update failed"))
    }

    return (
        <Layout>
            {loading
                ? <div className={"flex items-center justify-center h-full"}>
                    <LoadingSpinner className={"h-16 w-16"}/>
                </div>
                : userDetails && <div className={"px-4 sm:p-8 max-w-screen-sm mx-auto py-8"}>
                <h1 className={"heading text-center"}>Edit Profile</h1>
                <div className={"p-8 bg-white bg-opacity-60 rounded-2xl"}>
                    <EditProfileForm onSubmit={onUserDetailsSubmit} userDetails={userDetails}/>
                </div>
                <h1 className={"heading text-center mt-8"}>Change Password</h1>
                <div className={"p-8 bg-white bg-opacity-60 rounded-2xl"}>
                    <ChangePasswordForm onSubmit={onPasswordSubmit}/>
                </div>
            </div>
            }
        </Layout>
    )
}

export default Profile
