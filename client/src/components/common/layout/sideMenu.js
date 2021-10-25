import React from 'react'
import {useUser} from '../../../state/user/user-context'
import {CashIcon, LightBulbIcon, LogoutIcon, UserIcon} from "@heroicons/react/outline"
import {Link, useHistory, useLocation} from "react-router-dom";
import {clearTokens} from "../../../data-sources/local_storage";

const menuItems = [
    {
        title: 'Portfolio',
        path: '/',
        icon: <LightBulbIcon/>
    },
    {
        title: 'Loans',
        path: '/loans',
        icon: <CashIcon/>
    },
    {
        title: 'Profile',
        path: '/profile',
        icon: <UserIcon/>
    },
]
const SideMenu = () => {
    const [user, setUser] = useUser()
    const {pathname} = useLocation()
    const history = useHistory()

    return (
        <div className={"h-full w-80 text-black bg-white p-4"}>
            <div className={"flex items-center my-6 px-4"}>
                <div className={"flex-none h-12 w-12 rounded-full bg-gray-300"}/>
                <p className={"truncate ml-4 font-medium"}>
                    {user.email}
                </p>
            </div>
            <ul>
                {menuItems.map((item) => {
                    return <li key={item.path}>
                        <Link to={item.path}>
                            <div
                                className={`${pathname === item.path && "bg-indigo-600 text-white"} flex mb-2 p-4 rounded-xl hover:shadow-2xl hover:bg-indigo-500 hover:text-white`}>
                                <p className={"flex-1"}>{item.title}</p>
                                <div className={"opacity-30 ml-4 w-6 h-6"}>{item.icon}</div>
                            </div>
                        </Link>
                    </li>
                })}
                <li onClick={() => {
                    clearTokens()
                    setUser({id: null, email: null})
                    history.push("/")
                }}>
                    <div className={"flex p-4 rounded-xl hover:shadow-2xl hover:bg-indigo-500 hover:text-white"}>
                        <p className={"flex-1 font-medium"}>Logout</p>
                        <LogoutIcon className={"opacity-30 ml-4 w-6 h-6"}/>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default SideMenu
