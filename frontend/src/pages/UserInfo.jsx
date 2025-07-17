import React,{useState,useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {createUserInfo} from '../api/userInfo'
import { useAuth } from '../context/AuthContext'

function UserInfo() {
    const navigate = useNavigate()
    const [passportNumber, setPassportNumber] = useState('')
    const [address, setAddress] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const { user, isAuthenticated } = useAuth()

    // Check if user is authenticated
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/signin')
        }
    }, [isAuthenticated, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!passportNumber || !address || !phoneNumber) {
            setError("All fields are required")
            return
        }
        
        setIsLoading(true)
        setError("")
        
        try {
          console.log('Submitting user info with data:', {passportNumber, address, phoneNumber})
          const data = await createUserInfo({passportNumber, address, phoneNumber})
          console.log('User info created successfully:', data)
          navigate('/select-services')
        } catch (error) {
            console.error('Error creating user info:', error)
            if (error.response?.data?.message) {
                setError(error.response.data.message)
            } else if (error.message) {
                setError(error.message)
            } else {
                setError('Failed to save user information. Please try again.')
            }
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (error) {
            alert(error)
        }
    }, [error])



  return (
    <div className='flex flex-col items-start justify-start  w-full px-4 sm:px-6 lg:px-8 py-8 gap-6 sm:gap-8 lg:gap-10 '>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black font-manrope text-center">
        User Profile
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col items-start justify-start  w-full py-6'>
        <div className='flex flex-col gap-2'>
         <label className="text-black text-sm sm:text-base">ID/Passport Number</label>
         <input 
          type="number"
          placeholder='Enter your ID/Passport Number'
          className="w-[50rem] border-2 border-gray-300   bg-[#E7E7E7] p-3 sm:p-4 outline-none rounded-[12px] text-black text-[14px] sm:text-[16px] placeholder-gray-400"
          value={passportNumber}
          onChange={(e) => setPassportNumber(e.target.value)}
          />
        </div>
        <div className='flex flex-col gap-2'>
         <label className="text-black text-sm sm:text-base">Address</label>
         <input 
          type="text"
          placeholder='Enter Your Address'
          className="w-[50rem] border-2 border-gray-300   bg-[#E7E7E7] p-3 sm:p-4 outline-none rounded-[12px] text-black text-[14px] sm:text-[16px] placeholder-gray-400"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className='flex flex-col gap-2'>
         <label className="text-black text-sm sm:text-base">Phone</label>
         <input 
          type="text"
          placeholder='Enter Your Phone Number'
          className="w-[50rem] border-2 border-gray-300   bg-[#E7E7E7] p-3 sm:p-4 outline-none rounded-[12px] text-black text-[14px] sm:text-[16px] placeholder-gray-400"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <button
        disabled={isLoading}
        type='submit' 
        className={`bg-blue-500 text-white p-3 sm:p-4 outline-none rounded-[12px] text-[14px] sm:text-[16px] cursor-pointer ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600 hover:scale-105 transition-all duration-300'}`}>
          {isLoading ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  )
}

export default UserInfo