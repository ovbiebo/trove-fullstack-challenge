import mongooseService from "../services/mongoose.service";

const Schema = mongooseService.getMongoose().Schema;

const loanSchema = new Schema({
    _id: String,
    applicantId: String,
    duration: Number,
    amount: Number,
    status: Number,
    dateIssued: Date,
}, {id: false});

export const Loan = mongooseService.getMongoose().model('Loans', loanSchema);
