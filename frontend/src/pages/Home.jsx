import React from 'react';

function Home() {
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='flex flex-col items-center justify-center bg-blue-500 w-3/4 h-2/3 rounded-md mt-10 p-40'>
      <h1 className='text-[48px] font-bold text-white text-center'>Your All-in-One Solution for Modern Living</h1>
      <p className='text-[16px] text-white text-center'>From home maintenance to personal assistance, we connect you with trusted professionals to simplify your life.</p>
      <div className='flex flex-row items-center justify-center gap-4 mt-4'>
        <button className='bg-white text-blue-500 px-12 py-2 rounded-md cursor-pointer transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 font-semibold'>Sign Up</button>
        <button className='bg-white text-blue-500 px-12 py-2 rounded-md cursor-pointer transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 font-semibold'>Login</button>
      </div>
      </div>
    </div>
  );
}

export default Home; 