import React,{useState,useEffect} from 'react'
import { getServiceForms } from '../api/serviceForm';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function RequestHistory() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Check if user is authenticated
        if (!isAuthenticated) {
          setError('Please log in to view your request history');
          setLoading(false);
          return;
        }

        console.log('Fetching service forms...');
        const data = await getServiceForms();
        console.log('Service forms data:', data);
        setRequests(data);
         
      } catch (error) {
        console.error('Failed to fetch request history:', error);
        setError(error.response?.data?.message || 'Failed to fetch request history');
      } finally {
        setLoading(false);
      }
    };
    
    fetchRequests();
  }, [isAuthenticated]);

  if (loading) {
    return (
      <div className='flex flex-col mx-10 md:mx-20'>
        <div className='flex flex-col gap-4 mt-20'>
          <div className='flex flex-col'>
            <h1 className='md:text-[40px] text-[20px] text-black font-bold'>Request Histor</h1>
            <p className='text-[14px] text-[#4A709C]'>
              View your request history and track the status of your requests.
            </p>
          </div>
          <div className='flex items-center justify-center py-8'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500'></div>
            <span className='ml-2'>Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex '>
        <div className='flex'>
          <div className=''>
            <h1 className='text-[40px] text-black font-bold'>Request History</h1>
            <p className='text-[14px] text-[#4A709C]'>
              View your request history and track the status of your requests.
            </p>
          </div>
          <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>
            <p>{error}</p>
            {!isAuthenticated && (
              <button 
                onClick={() => navigate('/signin')}
                className='mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700'
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col mx-10 md:mx-20'>
      <div className='flex flex-col gap-4 mt-20'>
        <div className='flex flex-col'>
          <h1 className='text-[40px] text-black font-bold'>Request History</h1>
          <p className='text-[14px] text-[#4A709C]'>
            View your request history and track the status of your requests.
          </p>
        </div>
        <div className='flex flex-col gap-4'>
          {requests.length === 0 ? (
            <div className='text-center py-8'>
              <p className='text-gray-600 text-lg'>No requests found.</p>
              <p className='text-gray-500 text-sm mt-2'>
                You haven't made any service requests yet.
              </p>
              <button 
                onClick={() => navigate('/services')}
                className='mt-4 bg-[#4A709C] text-white px-6 py-2 rounded-md cursor-pointer hover:bg-[#3a5a7a]'
              >
                Browse Services
              </button>
            </div>
          ) : (
            requests.map((req) => (
              <div key={req._id} className='flex justify-between items-center  py-2'>
                <div className='flex flex-col gap-2'>
                  <p className='md:text-[18px] text-[16px] text-[#0D141C] font-medium'>
                    Request Date: {
      req.date ? 
        new Date(req.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }) : 
        'No date available'
    }
                  </p>
                  <p className='md:text-[16px] text-[14px] text-[#4A709C] font-medium'>
                    Service: {req.service ? req.service.name : 'Unknown Service'}
                  </p>
                  
                </div>
                <div>
                  <button
                    className='bg-[#4A709C] text-white md:p-4 p-2 rounded-md cursor-pointer'
                    onClick={() => navigate(`/request-details/${req._id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default RequestHistory