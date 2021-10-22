import React from 'react'
import SideMenu from './sideMenu'
import ScrollToTop from '../scroll-to-top'
import {Redirect} from "react-router-dom";
import {useUser} from "../../../state/user/user-context";

const Layout = ({children}) => {
    const [user] = useUser();

    return (
        !user.id
            ? <Redirect to={"/"}/>
            : <>
                <ScrollToTop/>
                <img src={"/vectors/Wave.svg"} alt={"wave"}
                     className={"right-56 fixed w-full h-full filter blur-4xl top-24"}/>
                <div className={'h-full flex relative z-10'}>
                    <SideMenu/>
                    <div className={'flex-grow bg-gray-200 bg-opacity-60 px-4 sm:px-8 overflow-y-auto'}>
                        {children}
                    </div>
                </div>
            </>
    )
}

export default Layout
