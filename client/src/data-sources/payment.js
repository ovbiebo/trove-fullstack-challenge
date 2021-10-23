import {get} from "../utils/xhr";

const initializePayment = async (userId, loanId) => {
    return get(`/payments/${userId}/${loanId}`)
        .then((loans) => {
            console.log(loans.data)
            return loans.data;
        })
        .catch((error) => {
            throw error
        });
}

export {initializePayment}
