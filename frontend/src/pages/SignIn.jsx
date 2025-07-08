import React from 'react'

function SignIn() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen w-full px-4 sm:px-6 lg:px-8 py-8 gap-6 sm:gap-8 lg:gap-10 '>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black font-manrope text-center">
        Welcome back
      </h1>
      <form className='flex flex-col gap-4 sm:gap-6 w-full max-w-md sm:max-w-lg lg:max-w-xl'>
        <div className='flex flex-col gap-2'>
         <label className="text-black text-sm sm:text-base">Email</label>
         <input 
          type="email"
          placeholder='Enter your email'
          className="w-full border-2 border-gray-300   bg-[#E7E7E7] p-3 sm:p-4 outline-none rounded-[12px] text-black text-[14px] sm:text-[16px] placeholder-gray-400" />
        </div>
        <div className='flex flex-col gap-2'>
         <label className="text-black text-sm sm:text-base">Password</label>
         <input 
          type="password"
          placeholder='Enter your password'
          className="w-full border-2 border-gray-300  bg-[#E7E7E7] p-3 sm:p-4 outline-none rounded-[12px] text-black text-[14px] sm:text-[16px] placeholder-gray-400" />
        </div>
        <button className='bg-blue-500 text-white p-3 sm:p-4 outline-none rounded-[12px] text-[14px] sm:text-[16px] cursor-pointer'>Sign In</button>
      </form>
    </div>
  )
}

export default SignIn