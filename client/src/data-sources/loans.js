import {get, post} from "../utils/xhr";

const getLoans = async (userId) => {
    return get(`/loans/${userId}`)
        .then((loans) => {
            console.log(loans.data)
            return loans.data;
        })
        .catch((error) => {
            throw error
        });
}

const takeLoan = async (userId, loanDetails) => {
    return post(`/loans/${userId}`, loanDetails)
        .catch((error) => {
            throw error
        });
}

export {getLoans, takeLoan}
