import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getServiceFormById } from '../api/serviceForm';
import { useAuth } from '../context/AuthContext';

function RequestDetails() {
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { requestId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchRequestDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!isAuthenticated) {
          setError('Please log in to view request details');
          setLoading(false);
          return;
        }

        const data = await getServiceFormById(requestId);
        setRequest(data);
         
      } catch (error) {
        console.error('Failed to fetch request details:', error);
        setError(error.response?.data?.message || 'Failed to fetch request details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchRequestDetails();
  }, [requestId, isAuthenticated]);

  if (loading) {
    return (
      <div className='flex flex-col mx-6 md:mx-20 '>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col'>
            <h1 className='text-[40px] text-black font-bold'>Request Details</h1>
            <p className='text-[14px] text-[#4A709C]'>
              View detailed information about your service request.
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
      <div className='flex flex-col mx-10 md:mx-20'>
        <div className='flex flex-col gap-4 mt-20'>
          <div className='flex flex-col'>
            <h1 className='text-[40px] text-black font-bold'>Request Details</h1>
            <p className='text-[14px] text-[#4A709C]'>
              View detailed information about your service request.
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
            <button 
              onClick={() => navigate('/request-history')}
              className='mt-2 ml-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700'
            >
              Back to History
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className='flex flex-col mx-10 md:mx-20'>
        <div className='flex flex-col gap-4 mt-20'>
          <div className='flex flex-col'>
            <h1 className='text-[40px] text-black font-bold'>Request Details</h1>
            <p className='text-[14px] text-[#4A709C]'>
              View detailed information about your service request.
            </p>
          </div>
          <div className='text-center py-8'>
            <p className='text-gray-600 text-lg'>Request not found.</p>
            <button 
              onClick={() => navigate('/request-history')}
              className='mt-4 bg-[#4A709C] text-white px-6 py-2 rounded-md cursor-pointer hover:bg-[#3a5a7a]'
            >
              Back to History
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col mx-10 md:mx-20'>
      <div className='flex flex-col gap-6 mt-20'>
        {/* Header */}
        <div className='flex flex-col'>
          <div className='flex items-center gap-4 mb-4'>
            <button 
              onClick={() => navigate('/request-history')}
              className='bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600'
            >
              ← Back to History
            </button>
          </div>
          <h1 className='text-[40px] text-black font-bold'>Request Details</h1>
          <p className='text-[14px] text-[#4A709C]'>
            Detailed information about your service request.
          </p>
        </div>

        {/* Request Information Card */}
        <div className='bg-white rounded-lg shadow-lg p-6 border border-gray-200'>
          <h2 className='text-2xl font-bold text-[#0D141C] mb-6'>Request Information</h2>
          
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Service Information */}
            <div className='space-y-4'>
              <h3 className='text-lg font-semibold text-[#4A709C] border-b border-gray-200 pb-2'>
                Service Details
              </h3>
              <div className='space-y-3'>
                <div>
                  <label className='text-sm font-medium text-gray-600'>Service Name:</label>
                  <p className='text-lg text-[#0D141C] font-medium'>
                    {request.service ? request.service.name : 'Unknown Service'}
                  </p>
                </div>
                {request.service && request.service.description && (
                  <div>
                    <label className='text-sm font-medium text-gray-600'>Description:</label>
                    <p className='text-[#4A709C]'>{request.service.description}</p>
                  </div>
                )}
                {request.service && request.service.price && (
                  <div>
                    <label className='text-sm font-medium text-gray-600'>Price:</label>
                    <p className='text-[#0D141C] font-medium'>${request.service.price}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Request Details */}
            <div className='space-y-4'>
              <h3 className='text-lg font-semibold text-[#4A709C] border-b border-gray-200 pb-2'>
                Request Details
              </h3>
              <div className='space-y-3'>
                <div>
                  <label className='text-sm font-medium text-gray-600'>Request Date:</label>
                  <p className='text-lg text-[#0D141C] font-medium'>
                    {request.date ? 
                      new Date(request.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      }) : 
                      'No date available'
                    }
                  </p>
                </div>
                <div>
                  <label className='text-sm font-medium text-gray-600'>Request ID:</label>
                  <p className='text-sm text-gray-500 font-mono'>{request._id}</p>
                </div>
                <div>
                  <label className='text-sm font-medium text-gray-600'>Status:</label>
                  <span className='inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm font-medium'>
                    Pending
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information Card */}
        <div className='bg-white rounded-lg shadow-lg p-6 border border-gray-200'>
          <h2 className='text-2xl font-bold text-[#0D141C] mb-6'>Contact Information</h2>
          
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='space-y-4'>
              <div>
                <label className='text-sm font-medium text-gray-600'>Full Name:</label>
                <p className='text-lg text-[#0D141C] font-medium'>{request.name}</p>
              </div>
              <div>
                <label className='text-sm font-medium text-gray-600'>Email Address:</label>
                <p className='text-[#4A709C]'>{request.email}</p>
              </div>
              <div>
                <label className='text-sm font-medium text-gray-600'>Phone Number:</label>
                <p className='text-[#4A709C]'>{request.phone}</p>
              </div>
            </div>

            <div className='space-y-4'>
              <div>
                <label className='text-sm font-medium text-gray-600'>Address:</label>
                <p className='text-[#4A709C]'>{request.address}</p>
              </div>
              <div>
                <label className='text-sm font-medium text-gray-600'>City:</label>
                <p className='text-[#4A709C]'>{request.city}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Notes Card */}
        {request.additionalNotes && (
          <div className='bg-white rounded-lg shadow-lg p-6 border border-gray-200'>
            <h2 className='text-2xl font-bold text-[#0D141C] mb-6'>Additional Notes</h2>
            <div className='bg-gray-50 p-4 rounded-lg'>
              <p className='text-[#4A709C] leading-relaxed'>{request.additionalNotes}</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 justify-center py-6'>
          <button 
            onClick={() => navigate('/request-history')}
            className='bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-600 font-medium'
          >
            Back to History
          </button>
          <button 
            onClick={() => navigate('/services')}
            className='bg-[#4A709C] text-white px-6 py-3 rounded-md hover:bg-[#3a5a7a] font-medium'
          >
            Request Another Service
          </button>
        </div>
      </div>
    </div>
  );
}

export default RequestDetails;