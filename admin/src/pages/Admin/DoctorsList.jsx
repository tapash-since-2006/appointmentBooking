import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailabilty } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className='w-full max-w-6xl m-5'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 pt-5'>
        {doctors.map((item, index) => (
          <div
            className='border border-indigo-200 rounded-xl overflow-hidden cursor-pointer group bg-white shadow-sm hover:shadow-md transition-all duration-300'
            key={index}
          >
            <img className='bg-indigo-50 w-full h-40 object-cover group-hover:scale-105 transition-all duration-500' src={item.image} alt="" />
            <div className='p-4'>
              <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
              <p className='text-zinc-600 text-sm'>{item.speciality}</p>
              <div className='mt-2 flex items-center gap-2 text-sm'>
                <input type="checkbox" checked={item.available} onChange={() => changeAvailabilty(item._id)}/>
                <p>Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
