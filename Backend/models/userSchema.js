import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
   firstName: {
      type: String,
      require: true,
      minLengthen: [3, "First name must contains at least 3 characters"],
   },
   lastName: {
      type: String,
      require: true,
      minLengthen: [3, "Last name must contains at least 3 characters"],
   },
   email: {
      type: String,
      require: true,
      validate: [validator.isEmail, "Please enter a valid email"],
   },
   phone: {
      type: String,
      require: true,
      minLengthen: [10, "Phone number must be contained exact 10 digits"],
      maxLengthen: [12, "Phone number must be contained exact 12 digits"],
   },
   nic: {
      type: String,
      require: true,
      minLengthen: [13, "NIC must be contained exact 13 digits"],
      maxLengthen: [13, "NIC must be contained exact 13 digits"],
   },
   dob: {
      type: Date,
      require: [true, "Date Of Birth is Require"],
   },
   gender: {
      type: String,
      require: true,
      enum: ["Male", "Female"],
   },
   password: {
      type: String,
      require: true,
      select: false,
      minLengthen: [11, "Password must contains at least 8 characters"],
   },
   role: {
      type: String,
      require: true,
      enum: ["admin", "patient", "doctor"],
   },
   doctorDepartment: {
      type: String,
   },
   docAvatar: {
      public_id: String,
      url: String,
   },
});

userSchema.pre("save", async function (next) {
   if (!this.isModified("password")) {
      next();
   }
   this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
   return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebToken = function () {
   return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES,
   });
};

export const User = mongoose.model("User", userSchema);
