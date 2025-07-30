import React from 'react'
import Services from '../components/Service'

function SelectServices() {
  return (
    <div className='flex flex-col items-center justify-center'>
        <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-black font-manrope text-center'>Select Services</h1>
        <Services />
    </div>
  )
}

export default SelectServices