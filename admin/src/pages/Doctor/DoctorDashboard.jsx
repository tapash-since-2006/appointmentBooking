import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets.js';

const DoctorDashboard = () => {
  const {
    dToken,
    dashData,
    getDashData,
    cancelAppointment,
    completeAppointment
  } = useContext(DoctorContext);

  const { slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  if (!dashData) return null;

  return (
    <div className="m-4 w-full">
      <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
        {[
          {
            icon: assets.earning_icon,
            label: 'Earnings',
            value: `${currency}${dashData.earnings}`
          },
          {
            icon: assets.appointment_icon,
            label: 'Appointments',
            value: dashData.appointments
          },
          {
            icon: assets.patients_icon,
            label: 'Patients',
            value: dashData.patients
          }
        ].map((card, i) => (
          <div
            key={i}
            className="flex items-center gap-3 bg-white p-4 min-w-[200px] rounded-xl shadow hover:scale-105 transition-transform"
          >
            <img className="w-12 h-12 object-contain" src={card.icon} alt={card.label} />
            <div>
              <p className="text-xl font-semibold text-gray-700">{card.value}</p>
              <p className="text-gray-400 text-sm">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow border">
        <div className="flex items-center gap-2 px-6 py-4 border-b">
          <img src={assets.list_icon} alt="List Icon" className="w-5 h-5" />
          <p className="font-semibold text-gray-700 text-lg">Latest Bookings</p>
        </div>

        <div className="divide-y">
          {dashData.latestAppointments.length === 0 && (
            <p className="text-center text-gray-400 py-6">No appointments found.</p>
          )}

          {dashData.latestAppointments.map((item, index) => (
            <div
              key={index}
              className="flex items-center flex-wrap md:flex-nowrap gap-4 px-6 py-4 hover:bg-gray-50"
            >
              <img className="w-12 h-12 rounded-full object-cover" src={item.userData.image} alt="Patient" />
              <div className="flex-1 min-w-[180px]">
                <p className="text-gray-800 font-semibold">{item.userData.name}</p>
                <p className="text-sm text-gray-500">{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
              </div>
              <div className="min-w-[120px]">
                {item.cancelled ? (
                  <span className="text-red-500 font-medium text-sm border border-red-500 px-3 py-1 rounded-full">
                    Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <span className="text-green-600 font-medium text-sm border border-green-500 px-3 py-1 rounded-full">
                    Completed
                  </span>
                ) : (
                  <div className="flex gap-2">
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      className="w-8 cursor-pointer hover:scale-110 transition"
                      src={assets.cancel_icon}
                      alt="Cancel"
                    />
                    <img
                      onClick={() => completeAppointment(item._id)}
                      className="w-8 cursor-pointer hover:scale-110 transition"
                      src={assets.tick_icon}
                      alt="Complete"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
