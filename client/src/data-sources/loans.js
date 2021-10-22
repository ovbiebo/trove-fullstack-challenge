import {get} from "../utils/xhr";

const getLoans = async (userId) => {
    return get(`/loans/${userId}`)
        .then((loans) => {
            return loans.data;
        })
        .catch((error) => {
            throw error
        });
}

export {getLoans}
