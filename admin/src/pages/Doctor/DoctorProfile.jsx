import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } = useContext(DoctorContext)
  const { currency } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      }
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/update-profile`,
        updateData,
        { headers: { dtoken: dToken } }
      )
      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (dToken) getProfileData()
  }, [dToken])

  return profileData && (
    <div className="p-5 flex justify-center w-full items-center">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-md border p-6">
        
        
        <div className="flex justify-center">
          <img
            className="w-28 h-28 rounded-full object-cover border-4 border-indigo-200 shadow"
            src={profileData.image || 'https://via.placeholder.com/150'}
            alt="Doctor Profile"
          />
        </div>

        
        <div className="text-center mt-4">
          <h2 className="text-2xl font-semibold text-gray-800">{profileData.name}</h2>
          <p className="text-sm text-gray-600">{profileData.degree} - {profileData.speciality}</p>
          <p className="text-xs bg-indigo-100 inline-block mt-1 px-2 py-0.5 rounded-full text-indigo-700">
            {profileData.experience}
          </p>
        </div>

        
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-700">About</h3>
          <p className="text-sm text-gray-600 mt-1">{profileData.about}</p>
        </div>

        
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Appointment Fee</label>
            {isEdit ? (
              <input
                type="number"
                value={profileData.fees}
                onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))}
                className="mt-1 w-full border px-3 py-1 rounded text-sm"
              />
            ) : (
              <p className="mt-1 text-sm text-gray-600">{currency}{profileData.fees}</p>
            )}
          </div>

          <div className="flex items-center gap-2 mt-2">
            <label className="text-sm font-medium text-gray-700">Available</label>
            <input
              type="checkbox"
              checked={profileData.available}
              onChange={() =>
                isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))
              }
              className="scale-110"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700">Address Line 1</label>
            {isEdit ? (
              <input
                type="text"
                value={profileData.address.line1}
                onChange={(e) =>
                  setProfileData(prev => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value }
                  }))
                }
                className="mt-1 w-full border px-3 py-1 rounded text-sm"
              />
            ) : (
              <p className="mt-1 text-sm text-gray-600">{profileData.address.line1}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700">Address Line 2</label>
            {isEdit ? (
              <input
                type="text"
                value={profileData.address.line2}
                onChange={(e) =>
                  setProfileData(prev => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value }
                  }))
                }
                className="mt-1 w-full border px-3 py-1 rounded text-sm"
              />
            ) : (
              <p className="mt-1 text-sm text-gray-600">{profileData.address.line2}</p>
            )}
          </div>
        </div>

        
        <div className="mt-6 text-center">
          {isEdit ? (
            <button
              onClick={updateProfile}
              className="bg-indigo-600 text-white px-5 py-2 text-sm rounded-full hover:bg-indigo-700 transition"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="border border-indigo-600 text-indigo-600 px-5 py-2 text-sm rounded-full hover:bg-indigo-600 hover:text-white transition"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile
