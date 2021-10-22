import {get} from "../utils/xhr";

const getInvestments = async (userId) => {
    return get(`/investments/${userId}`)
        .then((investments) => {
            return investments.data;
        })
        .catch((error) => {
            throw error
        });
}

export {getInvestments}
