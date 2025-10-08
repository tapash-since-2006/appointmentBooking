import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets.js';

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <h2 className="mb-5 text-2xl font-bold text-blue-900">📅 All Appointments</h2>

      <div className="bg-white border rounded-xl shadow-sm text-sm max-h-[80vh] min-h-[60vh] overflow-y-auto">


        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b bg-gray-50 text-gray-700 font-semibold">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>


        {appointments.map((item, index) => (
          <div key={index} className="border-b">

            {/* === Desktop Row === */}
            <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-700 py-4 px-6 hover:bg-gray-50">
              <p>{index + 1}</p>

              <div className="flex items-center gap-2">
                <img className="w-10 h-10 rounded-full object-cover" src={item.userData.image} alt="patient" />
                <span>{item.userData.name}</span>
              </div>

              <p>{calculateAge(item.userData.dob)}</p>
              <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>

              <div className="flex items-center gap-2">
                <img className="w-10 h-10 rounded-full object-cover" src={item.docData.image} alt="doctor" />
                <span>{item.docData.name}</span>
              </div>

              <p>{currency}{item.amount}</p>

              <div>
                {item.cancelled ? (
                  <span className="text-red-500 font-semibold">Cancelled</span>
                ) : item.isCompleted ? (
                  <span className="text-green-500 font-semibold">Completed</span>
                ) : (
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    className="w-6 cursor-pointer"
                    src={assets.cancel_icon}
                    alt="cancel"
                  />
                )}
              </div>
            </div>


            <div className="sm:hidden p-4">
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-3">
                <div className="flex items-center gap-3">
                  <img className="w-10 h-10 rounded-full object-cover" src={item.userData.image} alt="patient" />
                  <div>
                    <p className="text-gray-800 font-bold">{item.userData.name}</p>
                    <p className="text-xs text-gray-500">Age: {calculateAge(item.userData.dob)}</p>
                  </div>
                </div>

                <div className="text-sm text-gray-700">
                  <p><span className="font-medium">Date:</span> {slotDateFormat(item.slotDate)}</p>
                  <p><span className="font-medium">Time:</span> {item.slotTime}</p>
                  <p className="flex items-center gap-2 mt-1">
                    <img className="w-8 h-8 rounded-full object-cover" src={item.docData.image} alt="doctor" />
                    <span><strong>Dr.</strong> {item.docData.name}</span>
                  </p>
                  <p><span className="font-medium">Fees:</span> {currency}{item.amount}</p>
                </div>

                <div className="flex justify-end">
                  {item.cancelled ? (
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-semibold">Cancelled</span>
                  ) : item.isCompleted ? (
                    <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-semibold">Completed</span>
                  ) : (
                    <img onClick={() => cancelAppointment(item._id)} className="w-6 cursor-pointer" src={assets.cancel_icon} alt="cancel" />
                  )}
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointments;
