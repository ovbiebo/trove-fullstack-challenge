import React from 'react'
import {Link, useHistory} from "react-router-dom";
import {signIn} from "../data-sources/user";
import {useUser} from "../state/user/user-context";
import jwtDecode from "jwt-decode";
import SignInForm from "../components/forms/sign-in-form";
import {setTokens} from "../data-sources/local_storage";

const SignIn = () => {
    const history = useHistory()
    const [, setUser] = useUser()

    const onSubmit = async ({email, password}) => {
        const userTokens = await signIn(email, password);
        if (userTokens) {
            const {userId, email} = jwtDecode(userTokens["accessToken"])
            setUser({id: userId, email});
            setTokens(userTokens);
        }
        history.push("/portfolio")
    }

    return (
        <div className={"h-full w-full flex items-center justify-center flex-col bg-gray-50"}>
            <img src={"/vectors/Wave.svg"} alt={"wave"} className={"right-56 fixed w-full h-full filter blur-4xl top-28"}/>
            <div
                className={"z-10 flex flex-col justify-center sm:max-w-lg w-full h-full sm:h-auto bg-white bg-opacity-40 px-4 sm:p-8 sm:rounded-2xl"}>
                <SignInForm onSubmit={onSubmit}/>
            </div>
            <p className={"z-10 mt-4 text-sm"}>Need an account? <Link to={"/sign-up"}>Register</Link></p>
        </div>
    )
}

export default SignIn
