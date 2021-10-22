import React from 'react'
import {Link, useHistory} from "react-router-dom";
import {signUp} from "../data-sources/user";
import SignUpForm from "../components/forms/sign-up-form";
import jwtDecode from "jwt-decode";
import {useUser} from "../state/user/user-context";
import {setTokens} from "../data-sources/local_storage";

const SignUp = () => {
    const history = useHistory()
    const [, setUser] = useUser()

    const onSubmit = async ({firstName, lastName, email, password}) => {
        const userTokens = await signUp(firstName, lastName, email, password)
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
                <SignUpForm onSubmit={onSubmit}/>
            </div>
            <p className={"z-10 mt-4 text-sm"}>Already have an account? <Link to={"/"}>Sign in</Link>
            </p>
        </div>
    )
}

export default SignUp
