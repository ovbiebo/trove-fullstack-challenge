import React, {useEffect, useMemo} from 'react'
import Layout from "../components/common/layout/layout";
import {useStatefulXHR} from "../utils/xhr/useStatefulXHR";
import {getInvestments} from "../data-sources/portfolio";
import {useUser} from "../state/user/user-context";
import {LoadingSpinner} from "../components/common/indicators/loadingSpinner";
import {EquityChart} from "../components/charts/equity-chart";

const Portfolio = () => {
    const [user] = useUser()
    const {data: investments, error, makeRequest} = useStatefulXHR();

    useEffect(() => {
        makeRequest(() => getInvestments(user.id)).then()
    }, [user.id])

    const balance = useMemo(() => {
        if (investments && investments.length > 0) {
            let total = 0;
            investments.forEach((investment) => {
                total += investment.equityValue
            })
            return total
        } else {
            return null
        }
    }, [investments])

    const loading = !investments & !error;

    return (
        <Layout>
            {loading
                ? <div className={"flex items-center justify-center h-full"}>
                    <LoadingSpinner className={"h-16 w-16"}/>
                </div>
                : investments &&
                <div className={"min-h-full w-full flex flex-row-reverse"}>
                    <div className={"h-full w-96 py-8 flex sticky top-0 flex-col"}>
                        <div className={"bg-white rounded-2xl mb-4 p-6"}>
                            <h4 className={"text-gray-400"}>Total portfolio value</h4>
                            <h1 className={"font-medium text-4xl text-black"}>N{balance}</h1>
                            <h4 className={"text-gray-400 mt-2"}>Total assets</h4>
                            <h1 className={"font-medium text-4xl text-black"}>{investments.length}</h1>
                        </div>
                        <div className={"bg-white rounded-2xl p-6 flex-1"}>
                            <EquityChart/>
                        </div>
                    </div>
                    <div className={"flex-1 py-8 pr-4"}>
                        <h1 className={"heading"}>Welcome, <span className={"font-normal"}>{user.email}</span></h1>
                        <div className={"grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5"}>
                            {investments && investments.map((investment) => {
                                return <div key={investment.symbol}
                                            className={"bg-white mr-4 rounded-2xl h-48 p-6 mb-4"}>
                                    <h3>{investment.symbol}</h3>
                                    <h3 className={"heading text-black"}>N{investment.equityValue.toLocaleString()}</h3>
                                    <h3 className={"text-gray-400 text-sm"}>QTY: {investment.totalQuantity}</h3>
                                    <h3 className={"text-gray-400 text-sm"}>
                                        PPS: N{investment.pricePerShare.toLocaleString()}
                                    </h3>
                                </div>
                            })}
                        </div>
                        <h1 className={"heading mt-6"}>History</h1>
                        <div
                            className={"flex-1 min-h-page bg-white bg-opacity-80 rounded-2xl flex justify-center items-center"}>
                            <h3 className={"text-gray-400"}>You haven’t closed any investments</h3>
                        </div>
                    </div>
                </div>
            }
        </Layout>
    )
}

export default Portfolio
