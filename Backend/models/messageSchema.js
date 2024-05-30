import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        minLengthen: [3, 'First name must contains at least 3 characters']
    },
    lastName: {
        type: String,
        require: true,
        minLengthen: [3, 'Last name must contains at least 3 characters']
    },
    email: {
        type: String,
        require: true,
        validate: [validator.isEmail, 'Please enter a valid email']
    },
    phone: {
        type: String,
        require: true,
        minLengthen: [10, 'Phone number must be contained exact 10 digits'],
        maxLengthen: [12, 'Phone number must be contained exact 12 digits']
    },
    message: {
        type: String,
        require: true,
        minLengthen: [10, 'Message must contains at least 10 characters']
    }
});

export const Message = mongoose.model('Message',messageSchema);