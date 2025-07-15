import React,{useState} from 'react'

function RequestService() {
    const [preferredDate, setPreferredDate] = useState('');

    const today = new Date().toISOString().split('T')[0];
  return (
    <div className='flex flex-col mx-10 md:mx-20'>
        <h1 className='text-[16px] text-[#4A709C] font-medium'>Requests <span className='text-black font-medium'>/ House Cleaning</span></h1>

        <div className='flex flex-col gap-4 mt-20'>
            <div className='flex flex-col'>
                <h1 className='text-[40px] text-black font-bold'>House Cleaning Request</h1>
                <p className='text-[14px] text-[#4A709C]'>Please fill out the form below to submit your request. Your profile information will be pre-filled and read-only.</p>
            </div>

            <div className=''>
                <form action="" className='flex flex-col gap-8'>
                    <div className='flex flex-col gap-4'>
                       <h1 className='text-[24px] text-black font-medium'>Customer Information</h1> 
                       <div className='flex flex-col gap-2'>
                            <label htmlFor="name" className='text-[16px] text-black font-medium'>Name</label>
                            <input 
                            type="text" 
                            id="name" 
                            className='w-[448px] bg-[#E7E7E7] p-2 border-none rounded-md outline-none'
                            placeholder='Enter your name'
                            />
                       </div>
                       <div className='flex flex-col gap-2'>
                            <label htmlFor="email" className='text-[16px] text-black font-medium'>Email</label>
                            <input 
                            type="email" 
                            id="email" 
                            className='w-[448px] bg-[#E7E7E7] p-2 border-none rounded-md outline-none'
                            placeholder='Enter your email'
                            />
                       </div>
                       <div className='flex flex-col gap-2'>
                            <label htmlFor="phone" className='text-[16px] text-black font-medium'>Phone</label>
                            <input 
                            type="number" 
                            id="phone" 
                            className='w-[448px] bg-[#E7E7E7] p-2 border-none rounded-md outline-none'
                            placeholder='Enter your phone number'
                            />
                       </div>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <h1 className='text-[24px] text-black font-medium'>Location Details</h1>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="address" className='text-[16px] text-black font-medium'>Address</label>
                            <input 
                            type="text" 
                            id="address" 
                            className='w-[448px] bg-[#E7E7E7] p-2 border-none rounded-md outline-none'
                            placeholder='Enter your address'
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="city" className='text-[16px] text-black font-medium'>City</label>
                            <input 
                            type="text" 
                            id="city" 
                            className='w-[448px] bg-[#E7E7E7] p-2 border-none rounded-md outline-none'
                            placeholder='Enter your city'
                            />
                        </div>
                      
                    </div>

                    <div className='flex flex-col gap-4'>
                        <h1 className='text-[24px] text-black font-medium'>Schedule</h1>
                        <div className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="preferred-date" className='text-[16px] text-black font-medium'>Preferred Date</label>
                            <input 
                            type="date" 
                            id="preferred-date" 
                            value={preferredDate}
                            onChange={(e) => setPreferredDate(e.target.value)}
                            min={today}
                            className='w-[448px] bg-[#E7E7E7] p-2 border-none rounded-md outline-none'
                            />
                        </div>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <label htmlFor="additional-notes" className='text-[16px] text-black font-medium'>Additional Notes</label>
                        <textarea 
                        id="additional-notes" 
                        className='w-[448px] h-[228px] bg-[#E7E7E7] p-2 border-none rounded-md outline-none'
                        placeholder='Enter your additional notes'
                        />
                    </div>
                    </div>



                    
                    <button className='text-center  bg-blue-400 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 cursor-pointer'>Submit</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default RequestService