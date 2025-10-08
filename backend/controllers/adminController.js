import validator from 'validator'
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'
import userModel from '../models/userModel.js'

// Controller: Add a new doctor

const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;

    const imageFile = req.file;

    // 1. Check for missing required fields
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return res.status(400).json({ success: false, message: "Missing required details" });
    }

    // 2. Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Enter a valid email address" });
    }

    // 3. Check if email exists
    const existingDoctor = await doctorModel.findOne({ email });
    if (existingDoctor) {
      return res.status(409).json({ success: false, message: "Doctor with this email already exists" });
    }

    // 4. Password length check
    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
    }

    // 5. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 6. Upload image to Cloudinary from memory buffer
    let imageUrl = "";
    if (imageFile) {
      const streamUpload = (buffer) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { resource_type: "image" },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );
          stream.end(buffer);
        });
      };

      const uploadResult = await streamUpload(imageFile.buffer);
      imageUrl = uploadResult.secure_url;
    }

    // 7. Parse address
    let parsedAddress;
    try {
      parsedAddress = JSON.parse(address);
    } catch (err) {
      return res.status(400).json({ success: false, message: "Invalid address format. Must be JSON string." });
    }

    // 8. Prepare doctor object
    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience: Number(experience),
      about,
      fees: Number(fees),
      address: parsedAddress,
      date: Date.now(),
    };

    // 9. Save to DB
    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.status(201).json({ success: true, message: "Doctor added successfully" });
  } catch (error) {
    console.error("Error adding doctor:", error);
    res.status(500).json({ success: false, message: "Server error: " + error.message });
  }
};


// API FOR THE ADMIN LOGIN

const loginAdmin=async(req, res)=>{
    try {
        
        const {email, password}=req.body
        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
            const token=jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({success:true, token})
        }else{
            res.json({success:false, message:"Invalid Credentials"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}





// API FOR GETTING THE ALL DOCTOR LIST IN ADMIN PANEL

const allDoctors=async(req, res)=>{
    try {

        const doctors=await doctorModel.find({}).select('-password')
        res.json({success:true, doctors})
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}


// API to get all the appointments from the admin side

const appointmentAdmin=async(req,res)=>{
    try {
       
        const appointments=await appointmentModel.find({})
        res.json({success:true, appointments})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message}) 
    }
}




// API for appointment cancellation by the admin

const appointmentCancel=async(req,res)=>{
    try {
        const {appointmentId}=req.body;

        const appointmentData=await appointmentModel.findById(appointmentId)

        if (!appointmentData) {
        
        return res.json({ success: false, message: "Appointment not found" });
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled:true})

        // releasing the doctors slot time that was freed as a action be being cancelled
        const{docId, slotDate, slotTime}=appointmentData

        const doctorData=await doctorModel.findById(docId)

        let slots_booked=doctorData.slots_booked

        slots_booked[slotDate]=slots_booked[slotDate].filter(e=>e!==slotTime)

        await doctorModel.findByIdAndUpdate(docId,{slots_booked})

        res.json({success:true, message:"Appointment Cancelled"})


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message }) 
    }
}


// Api to get dashboard data for admin panel

const adminDashboard=async(req,res)=>{
    try {
        
        const doctors=await doctorModel.find({})
        const users=await userModel.find({})
        const appointments=await appointmentModel.find({})

        const dashData={
            doctors:doctors.length,
            appointments:appointments.length,
            patients:users.length,
            latestAppointments:appointments.reverse().slice(0,5)
        }

        res.json({success:true, dashData})


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}



export { addDoctor, loginAdmin, allDoctors, appointmentAdmin, appointmentCancel, adminDashboard}
