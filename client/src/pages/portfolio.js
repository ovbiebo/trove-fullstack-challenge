import React, {useEffect} from 'react'
import Layout from "../components/common/layout/layout";
import {useStatefulXHR} from "../utils/xhr/useStatefulXHR";
import {getInvestments} from "../data-sources/portfolio";
import {useUser} from "../state/user/user-context";
import {LoadingSpinner} from "../components/common/indicators/loadingSpinner";

const Portfolio = () => {
    const [user] = useUser()
    const {data: investments, error, makeRequest} = useStatefulXHR();

    useEffect(() => {
        makeRequest(() => getInvestments(user.id)).then()
    }, [user.id])

    const loading = !investments & !error;

    return (
        <Layout>
            {loading
                ? <div className={"flex items-center justify-center h-full"}>
                    <LoadingSpinner className={"h-16 w-16"}/>
                </div>
                : investments
                && <div className={"py-8 h-full w-full flex flex-col"}>
                    <h1 className={"heading"}>Welcome, <span className={"font-normal"}>{user.email}</span></h1>
                    <div className={"w-full flex flex-1"}>
                        <div className={"flex-1 flex flex-col pr-4"}>
                            <div className={"grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5"}>
                                {investments && investments.map((investment) => {
                                    return <div key={investment.symbol}
                                                className={"bg-white mr-4 rounded-2xl h-48 p-6 mb-4"}>
                                        <h3 className={"font-semibold text-black "}>{investment.symbol}</h3>
                                        <h3 className={"font-semibold heading text-black "}>N{investment.equityValue.toLocaleString()}</h3>
                                        <h3 className={"font-semibold text-gray-400 text-sm"}>QTY: {investment.totalQuantity}</h3>
                                        <h3 className={"font-semibold text-gray-400 text-sm"}>PPS:
                                            N{investment.pricePerShare.toLocaleString()}</h3>
                                    </div>
                                })}
                            </div>
                            <h1 className={"heading mt-6"}>History</h1>
                            <div
                                className={"flex-1 h-full bg-white bg-opacity-80 rounded-2xl flex justify-center items-center"}>
                                <h3 className={"text-gray-400"}>You haven’t closed any investments</h3>
                            </div>
                        </div>
                        <div className={"bg-white w-96 rounded-2xl"}>
                        </div>
                    </div>
                </div>}
        </Layout>
    )
}

export default Portfolio
