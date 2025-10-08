import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div className='bg-gray-50 py-16 px-4 text-gray-800' id='speciality'>
      <div className='text-center mb-10'>
        <h2 className='text-2xl md:text-3xl font-bold'>Choose a Speciality</h2>
        <p className='text-sm text-gray-600 mt-2'>Find healthcare professionals by their area of focus and expertise.</p>
      </div>

      <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6 max-w-5xl mx-auto'>
        {specialityData.map((item, index) => (
          <Link
            to={`/doctors/${item.speciality}`}
            key={index}
            onClick={() => scrollTo(0, 0)}
            className='flex flex-col items-center justify-center bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-lg hover:bg-indigo-50 transition-all duration-300 text-center'
          >
            <img src={item.image} alt={item.speciality} className='w-10 h-10 object-contain mb-2' />
            <span className='text-xs sm:text-sm font-medium'>{item.speciality}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;


