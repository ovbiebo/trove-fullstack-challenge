import React, {useEffect, useMemo, useState} from 'react'
import Layout from "../components/common/layout/layout";
import {useStatefulXHR} from "../utils/xhr/useStatefulXHR";
import {getLoans, takeLoan} from "../data-sources/loans";
import {LoadingSpinner} from "../components/common/indicators/loadingSpinner";
import {useUser} from "../state/user/user-context";
import {TakeLoanDialog} from "../components/common/dialogs/take-loan-dialog";
import {ArrowRightIcon} from "@heroicons/react/outline"

const Loans = () => {
    const [user] = useUser();
    const {data: loans, error, makeRequest} = useStatefulXHR();

    useEffect(() => {
        makeRequest(() => getLoans(user.id)).then()
    }, [user.id])

    const loading = !loans & !error;

    const [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const onLoanApplicationSubmit = async ({amount, duration}) => {
        await takeLoan(user.id, {amount, duration})
        closeModal()
        makeRequest(() => getLoans(user.id)).then()
    }

    const [pricePerMonth, amountPaid, percentagePaid, schedule, outstanding, payoffDate] = useMemo(() => {
        if (loans && loans.length > 0) {
            for (const loan of loans) {
                if (loan.status === 0) {
                    const duration = loan.duration === 0 ? 6 : 12;
                    const pricePerMonth = (loan.amount / duration).toFixed(2)
                    let date = new Date(loan.dateIssued);
                    const schedule = []
                    for (let i = 0; i < duration; i++) {
                        date.setMonth(date.getMonth() + 1);
                        schedule.push(`${date.getDay() + 1}/${date.getMonth() + 1}/${date.getFullYear()}`);
                    }
                    const payoffDate = `${date.getMonth() + 1}, ${date.getFullYear()}`;
                    return [pricePerMonth, null, null, schedule, null, payoffDate]
                }
            }
        }
        return []
    }, [loans])

    return (
        <Layout>
            {loading
                ? <div className={"flex items-center justify-center h-full"}>
                    <LoadingSpinner className={"h-16 w-16"}/>
                </div>
                : loans &&
                <div className={"py-8 w-full"}>
                    <h1 className={"heading"}>Your Loans</h1>
                    <div className={"flex-1 w-full flex mb-4"}>
                        <div className={"h-96 w-80 bg-white rounded-2xl p-6"}>
                            <h4 className={"subheading"}>Current monthly payment</h4>
                            <h1 className={"heading"}>N{pricePerMonth}</h1>
                            <hr/>
                            <div className={"flex"}>
                                <p className={"flex-1 text-gray-400"}>Payoff date</p>
                                <p>{payoffDate}</p>
                            </div>
                        </div>
                        <div className={"bg-white flex flex-col button-secondary rounded-2xl w-44 h-44 ml-4 p-6"}>
                            <h3 className={"flex-1"}>Make a loan payment</h3>
                            <ArrowRightIcon className={"h-6 w-6 self-end"}/>
                        </div>
                        <div
                            className={`${pricePerMonth ? "hidden" : ""} bg-white flex flex-col button-secondary rounded-2xl w-44 h-44 ml-4 p-6`}
                            onClick={() => openModal()}
                        >
                            <h3 className={"flex-1"}>Take a loan</h3>
                            <ArrowRightIcon className={"h-6 w-6 self-end"}/>
                        </div>
                    </div>
                    <h1 className={"heading"}>Payment Schedule</h1>
                    <div className={"flex flex-wrap"}>
                        {schedule && schedule.map((date) => {
                            return <div key={date}
                                        className={"secondary-bg text-white text-sm px-4 h-12 mb-4 rounded-3xl mr-4 flex items-center justify-center"}>{date}</div>
                        })}
                    </div>
                    <h1 className={"heading"}>History</h1>
                    <div
                        className={"flex-1 min-h-page bg-white bg-opacity-80 rounded-2xl flex justify-center items-center"}>
                        <h3 className={"text-gray-400"}>You haven’t payed off any loans</h3>
                    </div>
                </div>
            }
            <TakeLoanDialog isOpen={isOpen} onClose={closeModal} onSubmit={onLoanApplicationSubmit}/>
        </Layout>
    )
}

export default Loans
