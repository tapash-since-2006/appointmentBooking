import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const MyAppointments = () => {
  const navigate = useNavigate();  
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  const months = [" ", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_');
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2];
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token }
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/cancel-appointment`, { appointmentId }, {
        headers: { token }
      });

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  


  const appointmentStripePay = async (appointmentId) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/pay-with-stripe`, { appointmentId }, {
        headers: { token:token }
      });

      if (data.success) {
        const clientSecret = data.clientSecret;
        // Redirect to payment page with clientSecret as query param
        navigate(`/payment/${appointmentId}?clientSecret=${clientSecret}`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };


  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  
  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My appointments</p>
      <div>
        {appointments.map((item, index) => (
          <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
            <div className="w-32 h-32 overflow-hidden rounded-md">
  <img
    className="w-full h-full object-cover"
    src={item.docData.image}
    alt={item.docData.name}
  />
</div>
            <div className='flex-1 text-sm text-zinc-600'>
              <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
              <p>{item.docData.speciality}</p>
              <p className='text-zinc-700 font-medium mt-1'>Address:</p>
              <p className='text-xsm'>{item.docData.address.line1}</p>
              <p className='text-xsm'>{item.docData.address.line2}</p>
              <p className='text-xs mt-1'>
                <span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>
            <div className='flex flex-col gap-2 justify-end'>
              {!item.cancelled && item.payment && !item.isCompleted && (
                <button className='sm:min-w-48 py-2 border rounded-lg text-green-600 border-green-500'>
                  Payment Complete
                </button>
              )}
              {!item.cancelled && !item.payment && !item.isCompleted && (
                <button
                  onClick={() => appointmentStripePay(item._id)}
                  className='text-stone-500 text-center sm:min-w-48 py-2 border rounded-lg hover:bg-primary hover:text-white transition-all duration-300'
                >
                  Pay Online
                </button>
              )}
              {!item.cancelled && !item.payment && !item.isCompleted && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className='text-stone-500 text-center sm:min-w-48 py-2 border rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300'
                >
                  Cancel appointment
                </button>
              )}
              {item.cancelled && !item.isCompleted && (
                <button className='sm:min-w-48 py-2 border rounded-lg border-red-500 text-red-500'>
                  Appointment Cancelled
                </button>
              )}
              {item.isCompleted &&(
                <button className='sm:min-w-48 py-2 border border-green-500 rounded-lg text-green-500'>
                  Completed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
