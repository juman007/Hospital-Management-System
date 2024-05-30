import express from 'express';
import { config } from 'dotenv';
const app = express();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import { dbConnection } from './database/dbConnection.js';

import { errorMiddleware } from './middleware/errorMiddleaware.js'

import routerMessage from './router/message.js'
import userRouter from './router/userRouter.js';
import appointmenRouter from './router/appointmentRouter.js';


config({ path: './config/config.env' });

app.use(cors({
    origin: [process.env.FRONTEND_URI, process.env.DESHBOARD_URI],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(cookieParser());  //! for cookie get
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/temp'
}));

app.use('/api/v1/message', routerMessage);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/appointment', appointmenRouter);

dbConnection();

app.use(errorMiddleware);
export default app;