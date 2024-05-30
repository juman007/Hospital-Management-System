import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import { Appoinment } from "../models/appoinmentSchema.js";
import ErrorHandler from "../middleware/errorMiddleaware.js";

export const postAppointment = catchAsyncErrors(async (req, res, next) => {
   const {
      firstName,
      lastName,
      email,
      phone,
      nic,
      dob,
      gender,
      appoinment_date,
      department,
      doctor_firstName,
      doctor_lastName,
      address,
      hasVisited,
   } = req.body;

   if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !nic ||
      !dob ||
      !gender ||
      !appoinment_date ||
      !department ||
      !doctor_firstName ||
      !doctor_lastName ||
      !address
   ) {
      return next(new ErrorHandler("Please Fill Full Form", 400));
   }

   const isConflic = await User.find({
      firstName: doctor_firstName,
      lastName: doctor_lastName,
      role: "doctor",
      doctorDepartment: department,
   });

   if (isConflic.length === 0) {
      return next(new ErrorHandler("Doctor Not Found", 400));
   }

   if (isConflic.length > 1) {
      return next(
         new ErrorHandler("Doctor Conflic! Please Contact Email or Phone", 400)
      );
   }

   const doctorId = isConflic[0]._id;
   const patientId = req.user._id;

   const appoinment = await Appoinment.create({
      firstName,
      lastName,
      email,
      phone,
      nic,
      dob,
      gender,
      appoinment_date,
      department,
      doctor: {
         firstName: doctor_firstName,
         lastName: doctor_lastName,
      },
      hasVisited,
      address,
      doctorId,
      patientId,
   });

   res.status(200).json({
      success: true,
      message: "Appoinment sent successfully",
      appoinment,
   });
});

export const getAllAppoinments = catchAsyncErrors(async (req, res, next) => {
   const appointment = await Appoinment.find();
   res.status(200).json({
      success: true,
      appointment,
   });
});

export const updateAppoinmentStatus = catchAsyncErrors(
   async (req, res, next) => {
      const { id } = req.params;

      let appointment = await Appoinment.findById(id);

      if (!appointment) {
         return next(new ErrorHandler("Appoinment Not Found", 404));
      }
      appointment = await Appoinment.findByIdAndUpdate(id, req.body, {
         new: true,
         runValidators: true,
         useFindAndModify: false,
      });

      res.status(200).json({
         success: true,
         message: "Appoinment Updated Successfully",
         appointment,
      });
   }
);

export const deleteAppoinment = catchAsyncErrors(async (req, res, next) => {
   const { id } = req.params;

   let appointment = await Appoinment.findById(id);

   if (!appointment) {
      return next(new ErrorHandler("Appoinment Not Found", 404));
   }
   await appointment.deleteOne();

   res.status(200).json({
      success: true,
      message: "Appoinment Deleted Successfully",
   });
});
