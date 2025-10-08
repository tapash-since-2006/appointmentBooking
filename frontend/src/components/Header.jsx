import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-orange-100 rounded-lg px-6 md:px-10 lg:px-20'>
  {/* left side */}
  <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
    <p className='text-3xl md:text-4xl lg:text-5xl text-gray-800 font-semibold leading-tight md:leading-tight lg:leading-tight'>Book Appointment <br/> With Trusted Doctors</p>
    <div className='flex flex-col md:flex-row items-center gap-3 text-gray-600 text-sm font-light'>
      <p>Easily explore our wide network of Verified Healthcare Professionals. <br className='hidden sm:block'/> schedule your appointment hassle free</p>
    </div>
    <a href="#speciality" className='flex items-center gap-2 bg-stone-300 px-8 py-3 rounded-full text-gray-800 text-sm m-auto hover:scale-105 transition-all duration-300'>Book Appointment <img className='w-3' src={assets.arrow_icon}></img></a>
  </div>

  {/* Right side */}
  <div className='md:w-1/2 flex items-center justify-center py-10 md:py-0'>
    <div className='w-[320px] h-[400px] md:w-[400px] md:h-[500px] lg:w-[450px] lg:h-[550px] relative'>
      <img src='doctors2.jpg' alt='Doctors' className='w-full h-full object-cover rounded-xl' />
    </div>
  </div>
</div>


  )
}

export default Header