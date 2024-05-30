import express from 'express';
import { deleteAppoinment, getAllAppoinments, postAppointment, updateAppoinmentStatus } from '../controller/appoinmentController.js';
import { isAdminAuthenticated, isPatientAuthenticated } from '../middleware/auth.js'

const router = express.Router();


router.post('/post', isPatientAuthenticated, postAppointment);
router.get('/get', isAdminAuthenticated, getAllAppoinments);
router.put('/update/:id', isAdminAuthenticated, updateAppoinmentStatus);
router.delete('/delete/:id', isAdminAuthenticated, deleteAppoinment);

export default router;