import express from 'express'


import { addDoctor, adminDashboard, allDoctors, appointmentAdmin, appointmentCancel, loginAdmin } from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'
import { changeAvailabilty } from '../controllers/doctorController.js'

const adminRouter=express.Router()

adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor);
// upload single is the middleware and automatically have its next() which pasees the app.file to the next function
// called after it 

adminRouter.post('/login', loginAdmin)

adminRouter.post('/all-doctors', authAdmin ,allDoctors)

adminRouter.post('/change-availabilty', authAdmin ,changeAvailabilty)

adminRouter.get('/appointments', authAdmin, appointmentAdmin)

adminRouter.post('/cancel-appointment', authAdmin, appointmentCancel)

adminRouter.get('/dashboard', authAdmin, adminDashboard)


export default adminRouter