import mongooseService from "../services/mongoose.service";

const Schema = mongooseService.getMongoose().Schema;

const userSchema = new Schema({
    _id: String,
    email: String,
    password: { type: String, select: false },
    firstName: String,
    lastName: String,
}, { id: false });

export const User = mongooseService.getMongoose().model('Users', userSchema);
