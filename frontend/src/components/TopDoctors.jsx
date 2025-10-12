import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { FaCheckCircle, FaUserMd } from 'react-icons/fa';
import { BsDot } from 'react-icons/bs';

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className='px-5 md:px-16 my-20 text-gray-900'>
      <h2 className='text-3xl font-bold mb-2 text-center'>Top Rated Professionals</h2>
      <p className='text-sm text-gray-600 text-center max-w-xl mx-auto'>
        Trusted experts in their fields, available now. Choose confidently.
      </p>

      <div className='flex gap-6 overflow-x-auto mt-8 pb-4 hide-scrollbar'>
        {doctors.slice(0, 7).map((item, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
            className='min-w-[250px] bg-white border border-gray-200 rounded-2xl shadow-md p-4 flex-shrink-0 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer relative'
          >
            <div className='flex flex-col items-center gap-2'>
              <div className='relative'>
                <img
                  src={item.image}
                  alt={item.name}
                  className='w-24 h-24 object-cover rounded-full border-4 border-blue-200'
                  loading="lazy" // <-- lazy loading added here
                />
                {item.available ? (
                  <FaCheckCircle className='absolute -bottom-1 -right-1 text-green-500 bg-white rounded-full text-xl' />
                ) : (
                  <BsDot className='absolute -bottom-1 -right-1 text-gray-400 bg-white rounded-full text-3xl' />
                )}
              </div>
              <p className='font-semibold text-lg text-center'>{item.name}</p>
              <p className='text-gray-500 text-sm text-center'>{item.speciality}</p>
              <div className={`text-xs px-3 py-1 rounded-full ${item.available ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'} mt-1`}>
                {item.available ? 'Available Now' : 'Not Available'}
              </div>
            </div>
            <FaUserMd className='absolute top-3 right-3 text-blue-300 text-xl' />
          </div>
        ))}
      </div>

      <div className='flex justify-center mt-10'>
        <button
          onClick={() => {
            navigate('/doctors');
            scrollTo(0, 0);
          }}
          className='bg-gray-800 text-white px-8 py-3 rounded-full hover:bg-gray-900 transition-colors duration-300'
        >
          View All Specialists
        </button>
      </div>
    </div>
  );
};

export default TopDoctors;
