import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'

export const AppContext=createContext()

const AppContextProvider=(props)=>{

    const currencySymbol='$' // this is to  be done beacuse now depending on the country the currency value can be 
    // easily changed by chnaging one value here only

    const backendUrl="https://appointmentbooking-08it.onrender.com"

    const[doctors, setDoctors]=useState([])
    const[token, setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):null)
    const[userData, setUserData]=useState(null)
    

    const getDoctorsData=async()=>{
        try {
            
            const{data}=await axios.get(backendUrl+'/api/doctor/list')
            if(data.success){
                setDoctors(data.doctors)
            }else{
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }



    const loadUserProfileData=async()=>{
        try {
            const {data}=await axios.get(backendUrl+'/api/user/get-profile', {headers:{token:token}})

            if(data.success){
                setUserData(data.userData)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
           toast.error(error.message)
            console.log(error) 
        }
    }


    const value={
        doctors, getDoctorsData,
        currencySymbol,
        token, setToken,
        backendUrl,
        userData, setUserData, loadUserProfileData
    }



    useEffect(()=>{
        getDoctorsData();
    },[])


    useEffect(()=>{
        if(token){
            loadUserProfileData()
        }else{
            setUserData(null)
        }
    },[token])


    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
