import React,{useState,useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { signin } from '../api/auth'
import { useAuth } from '../context/AuthContext'

function SignIn() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSignIn = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      
      const response = await signin({ email, password })
      console.log(response)
      
      // Use the context login function
      login(response.user, response.token);
      
      setIsLoading(false);
      navigate('/select-services') // Redirect to UserInfo page
    } catch (error) {
      console.error('Signin error:', error);
      setError(error.response?.data?.message || 'Sign in failed. Please try again.');
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (error) {
      alert(error)
    }
  }, [error])

  return (
    <div className='flex flex-col items-center  md:h-screen h-screen w-full px-4 sm:px-2 lg:px-8 py-8 gap-6 sm:gap-8 lg:gap-10 '>
        <div className='md:mt-20 mt-10 md:w-3/4 w-full md:h-[60%] h-[40%] rounded-md md:p-10 p-2'>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black font-manrope text-center">
        Welcome back
      </h1>
      <form onSubmit={handleSignIn} className='flex flex-col gap-4 sm:gap-6 w-full max-w-md sm:max-w-lg lg:max-w-xl md:mt-10 mt-5'>
        <div className='flex flex-col gap-2'>
         <label className="text-black text-sm sm:text-base">Email</label>
         <input 
          type="email"
          placeholder='Enter your email'
          className="w-full border-2 border-gray-300   bg-[#E7E7E7] p-3 sm:p-4 outline-none rounded-[12px] text-black text-[14px] sm:text-[16px] placeholder-gray-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          />
        </div>
        <div className='flex flex-col gap-2'>
         <label className="text-black text-sm sm:text-base">Password</label>
         <input 
          type="password"
          placeholder='Enter your password'
          className="w-full border-2 border-gray-300  bg-[#E7E7E7] p-3 sm:p-4 outline-none rounded-[12px] text-black text-[14px] sm:text-[16px] placeholder-gray-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          />
        </div>
        <button 
          disabled={isLoading}
          type='submit'
          className={`bg-blue-500 text-white p-3 sm:p-4 outline-none rounded-[12px] text-[14px] sm:text-[16px] cursor-pointer ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600 hover:scale-105 transition-all duration-300'}`}>
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>
        <p className='text-[#5C738A] text-sm sm:text-base text-center'>Don't have an account? <Link className='font-bold' to="/signup">Sign Up</Link></p>
      </form>
        </div>
    </div>
  )
}

export default SignIn