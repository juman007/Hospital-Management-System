import express from 'express';
import { addNewAdmin, addNewDoctor, getAllDoctors, getUserDetails, login, logoutAdmin, logoutPatient, patientRegister } from '../controller/userController.js';
const router = express.Router();

import { isAdminAuthenticated, isPatientAuthenticated } from '../middleware/auth.js'



router.post('/patient/register', patientRegister)
router.post('/login', login)
router.post('/admin/addnew', isAdminAuthenticated, addNewAdmin)
router.get('/doctors', getAllDoctors)
router.get('/admin/me', isAdminAuthenticated, getUserDetails);
router.get('/patient/me', isPatientAuthenticated, getUserDetails);
router.get('/admin/logout', isAdminAuthenticated, logoutAdmin);
router.get('/patient/logout', isPatientAuthenticated, logoutPatient);
router.post('/doctor/addnew', addNewDoctor);

export default router;