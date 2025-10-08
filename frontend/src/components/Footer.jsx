import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
    const navigate=useNavigate()
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            
            {/* Left Section */}
            <div>
                <img className='mb-5 w-40' src='../../public/Preview.png' alt="" />
                <p className='w-full md:w-2/3 text-gray-600 leading-6'>Doqto is an online platform that lets patients quickly find and book appointments with nearby doctors. It offers an easy, hassle-free way to schedule in-person medical visits anytime.</p>
            </div>

            {/* Center Section */}
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                   <li  onClick={() => (navigate('/'), window.scrollTo({ top: 0, behavior: 'smooth' }))}>Home</li>
                    <li onClick={() => (navigate('/about'), window.scrollTo({ top: 0, behavior: 'smooth' }))}>About Us</li>
                    <li onClick={() => (navigate('/contact'), window.scrollTo({ top: 0, behavior: 'smooth' }))}>Contact Us</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>

            {/* Right Section */}
            <div>
                <p className='text-xl font-medium mb-5'>Get in touch</p>
                <ul  className='flex flex-col gap-2 text-gray-600'>
                    <li>9395334387</li>
                    <li>upadhyayt15@gmail.com</li>
                </ul>
            </div>

        </div>

        {/* Copyright text */}
        <div>
            <hr/>
            <p className='py-5 text-sm text-center'>Copyright 2025 Tapash-All Right Reserved</p>
        </div>
    </div>
  )
}

export default Footer