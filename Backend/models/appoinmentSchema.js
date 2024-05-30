import mongoose from "mongoose";
import validator from "validator";


const appoinmentSchema = new mongoose.Schema({
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
    nic: {
        type: String,
        require: true,
        minLengthen: [13, 'NIC must be contained exact 13 digits'],
        maxLengthen: [13, 'NIC must be contained exact 13 digits']
    },
    dob: {
        type: Date,
        require: [true, "Date Of Birth is Require"]
    },
    gender: {
        type: String,
        require: true,
        enum: ['Male', 'Female']
    },
    appoinment_date: {
        type: String,
        require: true
    },
    department: {
        type: String,
        require: true
    },
    doctor: {
        firstName: {
            type: String,
            require: true
        },
        lastName: {
            type: String,
            require: true
        }
    },
    hasVisited: {
        type: Boolean,
        default: false
    },
    doctorId: {
        type: mongoose.Schema.ObjectId,
        require: true
    },
    patientId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        require: true
    },
    address: {
        type: String,
        require: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: "pending"
    }
});

export const Appoinment = mongoose.model('Appoinment', appoinmentSchema);