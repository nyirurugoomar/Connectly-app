import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center md:h-screen h-screen'>
      <div className='flex flex-col items-center justify-center md:space-y-4 space-y-4 bg-blue-700 md:w-3/4 w-full md:h-[60%] h-[40%] rounded-md md:mt-20 mt-10 md:p-10 p-2'>
      <h1 className='md:text-[48px] text-[18px] font-bold text-white text-center'>Your All-in-One Solution for Modern Living</h1>
      <p className='md:text-[16px] text-[12px] text-white text-center'>From home maintenance to personal assistance, we connect you with trusted professionals to simplify your life.</p>
      <div className='hidden md:flex  flex-row items-center justify-center gap-4 mt-4'>
        <button onClick={() => navigate('/signup')} className='bg-white text-black px-12 py-2 rounded-md cursor-pointer transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 font-semibold'>Sign Up</button>
        <button onClick={() => navigate('/signin')} className='bg-white text-black px-12 py-2 rounded-md cursor-pointer transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 font-semibold'>Login</button>
      </div>
      </div>
    </div>
  );
}

export default Home; 