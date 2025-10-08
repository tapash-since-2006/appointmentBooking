import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col md:flex-row bg-rose-400 rounded-lg px-6 sm:px-10 lg:px-12 my-20 md:mx-10'>
      
      {/* Left Side */}
      <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5'>
        <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white'>
          <p>Book Appointment</p>
          <p className='mt-4'>With 100+ trusted doctors</p>
        </div>
        <button 
          onClick={() => { navigate('/login'); scrollTo(0, 0) }} 
          className='bg-white text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all'
        >
          Create Account
        </button>
      </div>

      {/* Right Side - Image Holder */}
      <div className='hidden md:flex items-end justify-end w-full md:w-[40%]'>
        <div className='relative w-full max-w-xs h-64'>
          <img 
            src={assets.appointment_img} 
            alt="Appointment Illustration" 
            className='absolute bottom-0 right-0 w-full h-full object-contain' 
          />
        </div>
      </div>
    </div>
  )
}

export default Banner
