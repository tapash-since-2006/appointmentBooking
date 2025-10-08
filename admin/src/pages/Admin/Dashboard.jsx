import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { assets } from '../../assets/assets.js';
import { AppContext } from '../../context/AppContext.jsx';

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return dashData && (
    <div className='w-full max-w-6xl m-5'>
      <div className='flex flex-wrap gap-4'>
        <div className='flex items-center gap-3 bg-white p-4 w-full sm:w-auto min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.doctor_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.doctors}</p>
            <p className='text-gray-400 text-md'>Doctors</p>
          </div>
        </div>
        <div className='flex items-center gap-3 bg-white p-4 w-full sm:w-auto min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.appointment_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
            <p className='text-gray-400 text-md'>Appointments</p>
          </div>
        </div>
        <div className='flex items-center gap-3 bg-white p-4 w-full sm:w-auto min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.patients_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
            <p className='text-gray-400 text-md'>Patients</p>
          </div>
        </div>
      </div>

      <div className='bg-white mt-10 rounded border overflow-hidden'>
        <div className='flex items-center gap-2.5 px-4 py-4 border-b'>
          <img src={assets.list_icon} alt="" />
          <p className='font-semibold'>Latest Booking</p>
        </div>

        <div className='divide-y'>
          {dashData.latestAppointments.map((item, index) => (
            <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={index}>
              <img className='rounded-full w-10 h-10' src={item.docData.image} alt="" />
              <div className='flex-1 text-lg'>
                <p className='text-gray-800 font-bold'>{item.docData.name}</p>
                <p className='text-gray-600 font-semibold'>{slotDateFormat(item.slotDate)}</p>
              </div>
              {item.cancelled
                ? <p className='text-red-400 text-m font-medium'>Cancelled</p>
                : item.isCompleted
                  ? <p className='text-green-400 text-m font-medium'>Completed</p>
                  : <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
