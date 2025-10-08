import express from 'express'
import { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, payWithStripe, verifyStripePayment} from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'


const userRouter=express.Router()


userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/get-profile', authUser, getProfile)
userRouter.post('/update-profile', authUser, upload.single('image'),updateProfile)
userRouter.post('/book-appointment', authUser, bookAppointment)
userRouter.get('/appointments', authUser, listAppointment)
userRouter.post('/cancel-appointment', authUser, cancelAppointment)
// userRouter.post('/payement-razorpay', authUser, payementRazorpay)
// userRouter.post('/verifyRazorpay', authUser, verifyRazorpay)

userRouter.post('/pay-with-stripe', authUser, payWithStripe);
userRouter.post('/verify-stripe', authUser, verifyStripePayment);


export default userRouter