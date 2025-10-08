import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets.js'
import { AdminContext } from '../../context/AdminContext.jsx'
import { toast } from 'react-toastify'
import axios from 'axios'
const AddDoctor = () => {

  const [loading, setLoading] = useState(false);


  const [docImg, setDocImg] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('General physician')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')


  const { backendUrl, aToken } = useContext(AdminContext)


  const onSubmitHandler = async (event) => {
    event.preventDefault()
    setLoading(true)
    try {
      if (!docImg) {
        return toast.error('Image Not Selected')
      }

      const formData = new FormData()

      formData.append('image', docImg)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('experience', experience)
      formData.append('fees', Number(fees))
      formData.append('about', about)
      formData.append('speciality', speciality)
      formData.append('degree', degree)
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))

      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`)
      })

      const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { atoken: aToken } })
      if (data.success) {
        toast.success(data.message)
        setDocImg(null);
        setName('');
        setEmail('')
        setPassword('')
        setAddress1('')
        setAddress2('')
        setAbout('')
        setFees('')
        setDegree('')

      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }


  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full'>
      <p className='mb-3 text-lg font-medium'>Add Doctor</p>

      {/* this is for attaching the image
      genrally the input tag for images is ugly so using label we can make anything clickable as the input */}
      <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl mah-h-[80vh] overflow-y-scroll'>
        <div className='flex items-center gap-4 mb-8 text-gray-500'>
          <label htmlFor="doc-img">
            <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id='doc-img' hidden />
          <p>Upload Doctor <br /> <span className='font-bold text-lg'>Picture</span></p>
        </div>

        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>


            <div className='flex-1 flex-col flex gap-1'>
              <p>Doctor Name</p>
              <input value={name} onChange={(e) => setName(e.target.value)} className='border rounded px-3 py-2' type="text" placeholder='Name' required />
            </div>

            <div className='flex-1 flex-col flex gap-1'>
              <p>Doctor Email</p>
              <input value={email} onChange={(e) => setEmail(e.target.value)} className='border rounded px-3 py-2' type="email" placeholder='Email' required />
            </div>

            <div className='flex-1 flex-col flex gap-1'>
              <p>Doctor Password</p>
              <input value={password} onChange={(e) => setPassword(e.target.value)} className='border rounded px-3 py-2' type="password" placeholder='Password' required />
            </div>

            <div className='flex-1 flex-col flex gap-1'>
              <p>Experience</p>
              <select value={experience} onChange={(e) => setExperience(e.target.value)} className='border rounded px-3 py-2' name="" id="">
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>

            <div className='flex-1 flex-col flex gap-1'>
              <p>Fees</p>
              <input value={fees} onChange={(e) => setFees(e.target.value)} className='border rounded px-3 py-2' type="number" placeholder='Fees' required />
            </div>
          </div>

          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex-col flex gap-1'>
              <p>Speciality</p>
              <select value={speciality} onChange={(e) => setSpeciality(e.target.value)} className='border rounded px-3 py-2' name="" id="">
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div className='flex-1 flex-col flex gap-1'>
              <p>Education</p>
              <input value={degree} onChange={(e) => setDegree(e.target.value)} className='border rounded px-3 py-2' type="text" placeholder='Education' required />
            </div>

            <div className='flex-1 flex-col flex gap-1'>
              <p>Address</p>
              <input value={address1} onChange={(e) => setAddress1(e.target.value)} className='border rounded px-3 py-2' type="text" placeholder='address 1' required />
              <input value={address2} onChange={(e) => setAddress2(e.target.value)} className='border rounded px-3 py-2' type="text" placeholder='address 2' required />
            </div>

          </div>
        </div>


        <div className='mt-4 mb-2'>
          <p>About Doctor</p>
          <textarea value={about} onChange={(e) => setAbout(e.target.value)} className='w-full px-4 pt-2 border rounded' placeholder='write about doctor' rows={5} required />
        </div>
        <button type="submit" disabled={loading} className={`bg-primary px-10 py-3 mt-4 text-white rounded-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>{loading ? 'Adding...' : 'Add Doctor'}</button>
      </div>
    </form>
  )
}

export default AddDoctor