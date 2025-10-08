import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets.js'
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false);

  const updateUserProfileData = async () => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)
      image && formData.append('image', image)

      const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token: token } })

      if (data.success) {
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(null)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return userData && (
    <div className='max-w-2xl w-full mx-auto p-6 rounded-2xl shadow-xl bg-white text-m'>
      {/* Profile Image and Name */}
      <div className='flex flex-col items-center gap-4'>
        {
          isEdit ? (
            <label htmlFor="image" className='cursor-pointer'>
              <div className='relative group w-40 h-40 rounded-full overflow-hidden border border-dashed border-gray-300 flex items-center justify-center'>
                <img
                  src={image ? URL.createObjectURL(image) : userData.image}
                  alt="Profile"
                  className='w-full h-full object-cover group-hover:opacity-70 transition'
                />
                {!image &&
                  <img
                    src={assets.upload_icon}
                    alt="Upload"
                    className='absolute w-10 h-10 opacity-60 group-hover:opacity-100'
                  />
                }
              </div>
              <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
            </label>
          ) : (
            <img
              className='w-40 h-40 rounded-full object-cover shadow-md'
              src={userData.image}
              alt="Profile"
            />
          )
        }

        <div>
          {
            isEdit
              ? (
                <input
                  className='text-2xl font-semibold text-center border-b outline-none bg-gray-100 p-1 rounded-md'
                  value={userData.name}
                  onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
                  type="text"
                />
              ) : (
                <p className='text-2xl font-semibold text-gray-800'>{userData.name}</p>
              )
          }
        </div>
      </div>

      <hr className='my-6 border-gray-300' />

      {/* Contact Info */}
      <div className='space-y-2'>
        <p className='text-neutral-500 font-semibold text-lg underline'>Contact Information</p>
        <div className='grid grid-cols-[120px_1fr] gap-y-3 text-gray-700'>
          <p className='font-medium'>Email:</p>
          <p className='text-blue-500 break-words'>{userData.email}</p>

          <p className='font-medium'>Phone:</p>
          {
            isEdit
              ? <input className='bg-gray-100 px-2 py-1 rounded-md w-full max-w-sm' value={userData.phone} onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} type="text" />
              : <p className='text-blue-400'>{userData.phone}</p>
          }

          <p className='font-medium'>Address:</p>
          {
            isEdit
              ? <div className='space-y-1'>
                <input className='bg-gray-100 px-2 py-1 rounded-md w-full max-w-sm' value={userData.address.line1} onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} type="text" />
                <input className='bg-gray-100 px-2 py-1 rounded-md w-full max-w-sm' value={userData.address.line2} onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} type="text" />
              </div>
              : <p className='text-gray-500 whitespace-pre-line'>
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
          }
        </div>
      </div>

      <hr className='my-6 border-gray-300' />

      {/* Basic Info */}
      <div className='space-y-2'>
        <p className='text-neutral-500 font-semibold text-lg underline'>Basic Information</p>
        <div className='grid grid-cols-[120px_1fr] gap-y-3 text-gray-700'>
          <p className='font-medium'>Gender:</p>
          {
            isEdit
              ? <select className='bg-gray-100 px-2 py-1 rounded-md max-w-fit' value={userData.gender} onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              : <p className='text-gray-500'>{userData.gender}</p>
          }

          <p className='font-medium'>Birthday:</p>
          {
            isEdit
              ? <input className='bg-gray-100 px-2 py-1 rounded-md max-w-fit' value={userData.dob} onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} type="date" />
              : <p className='text-gray-500'>{userData.dob}</p>
          }
        </div>
      </div>

      {/* Buttons */}
      <div className='mt-10 flex justify-center'>
        {
          isEdit ? (
            <button
              disabled={loading}
              onClick={updateUserProfileData}
              className={`border px-8 py-2 rounded-full transition-all
                ${loading ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'border-primary hover:bg-primary hover:text-white'}`}
            >
              {loading
                ? <span className='flex items-center gap-2'>
                    <span className="loader w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Saving...
                  </span>
                : 'Save Information'}
            </button>
          ) : (
            <button
              disabled={loading}
              onClick={() => setIsEdit(true)}
              className={`border px-8 py-2 rounded-full transition-all
                ${loading ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'border-primary hover:bg-primary hover:text-white'}`}
            >
              Edit
            </button>
          )
        }
      </div>
    </div>
  )
}
export default Profile
