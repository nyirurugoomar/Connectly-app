import React from 'react'

function Footer() {
  return (
    <div className='w-full mt-4'>
      <div className='flex flex-col items-center'>
        <div className='flex w-full max-w-4xl justify-between mb-4'>
          <a href='#' className='text-[#4A709C] text-lg'>Terms of Service</a>
          <a href='#' className='text-[#4A709C] text-lg'>Privacy Policy</a>
          <a href='#' className='text-[#4A709C] text-lg'>Contact Us</a>
        </div>
        <div className='text-[#4A709C] text-lg'>
          ©2025 Connectly. All rights reserved.
        </div>
      </div>
    </div>
  )
}

export default Footer