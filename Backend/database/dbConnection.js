import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose
        .connect(process.env.OFFLINE_MONGO_URI, {
            dbName: "HOSPITAL_MANAGEMENT_SYSTEM"
        })
        .then(() => {
            console.log("Connected to database")
        })
        .catch((error) => {
            console.log(error)
        });
}