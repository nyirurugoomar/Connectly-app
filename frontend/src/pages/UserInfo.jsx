import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
function UserInfo() {
    const navigate = useNavigate()
  return (
    <div className='flex flex-col items-start justify-start  w-full px-4 sm:px-6 lg:px-8 py-8 gap-6 sm:gap-8 lg:gap-10 '>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black font-manrope text-center">
        User Profile
      </h1>
      <form className='flex flex-col items-start justify-start  w-full py-6'>
        <div className='flex flex-col gap-2'>
         <label className="text-black text-sm sm:text-base">ID/Passport Number</label>
         <input 
          type="number"
          placeholder='Enter your ID/Passport Number'
          className="w-[50rem] border-2 border-gray-300   bg-[#E7E7E7] p-3 sm:p-4 outline-none rounded-[12px] text-black text-[14px] sm:text-[16px] placeholder-gray-400" />
        </div>
        <div className='flex flex-col gap-2'>
         <label className="text-black text-sm sm:text-base">Address</label>
         <input 
          type="text"
          placeholder='Enter Your Address'
          className="w-[50rem] border-2 border-gray-300   bg-[#E7E7E7] p-3 sm:p-4 outline-none rounded-[12px] text-black text-[14px] sm:text-[16px] placeholder-gray-400" />
        </div>
        <div className='flex flex-col gap-2'>
         <label className="text-black text-sm sm:text-base">Phone</label>
         <input 
          type="text"
          placeholder='Enter Your Phone Number'
          className="w-[50rem] border-2 border-gray-300   bg-[#E7E7E7] p-3 sm:p-4 outline-none rounded-[12px] text-black text-[14px] sm:text-[16px] placeholder-gray-400" />
        </div>
        <button onClick={() => navigate('/select-services')} className=' w-[10rem] bg-blue-500 ml-auto text-white p-3 sm:p-4 outline-none rounded-[12px] text-[14px] sm:text-[16px] cursor-pointer'>Save</button>
      </form>
    </div>
  )
}

export default UserInfo