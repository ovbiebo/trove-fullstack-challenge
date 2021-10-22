import React, {useEffect} from 'react'
import Layout from "../components/common/layout/layout";
import {useStatefulXHR} from "../utils/xhr/useStatefulXHR";
import {getLoans} from "../data-sources/loans";
import {LoadingSpinner} from "../components/common/indicators/loadingSpinner";
import {useUser} from "../state/user/user-context";

const Loans = () => {
    const [user] = useUser();
    const {data: loans, error, makeRequest} = useStatefulXHR();

    useEffect(() => {
        makeRequest(() => getLoans(user.id)).then()
    }, [user.id])

    const loading = !loans & !error;

    return (
        <Layout>
            {loading
                ? <div className={"flex items-center justify-center h-full"}>
                    <LoadingSpinner className={"h-16 w-16"}/>
                </div>
                : loans
                && <div className={"py-8 h-full w-full flex flex-col"}>
                    <h1 className={"heading"}>Your Loans</h1>
                    <div className={"flex-1 w-full grid grid-cols-8 grid-rows-2"}>
                        <div className={"row-span-2 col-span-2 bg-white rounded-2xl p-6"}>
                            {console.log(loans)}
                            <h4>Current monthly payment</h4>
                        </div>
                        <div className={"bg-white rounded-2xl ml-4"}>
                        </div>
                    </div>
                    <h1 className={"heading"}>History</h1>
                    <div
                        className={"flex-1 h-full bg-white bg-opacity-80 rounded-2xl flex justify-center items-center"}>
                        <h3 className={"text-gray-400"}>You haven’t payed off any loans</h3>
                    </div>
                </div>
            }
        </Layout>
    )
}

export default Loans
