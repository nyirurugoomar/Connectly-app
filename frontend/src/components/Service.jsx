import React, { useState, useEffect }  from 'react'
import { getServices } from '../api/service'
import { useNavigate } from 'react-router-dom';

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getServices();
        console.log('Fetched services:', response); // Debug log
        setServices(response);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const handleServiceSelect = (serviceId) => {
    console.log('Selecting service with ID:', serviceId); // Debug log
    setSelectedService(prev => {
      const newSelection = prev === serviceId ? null : serviceId;
      console.log('New selection:', newSelection); // Debug log
      return newSelection;
    });
  };

  const handleNext = () => {
    if(selectedService){
        console.log('Selected service:', selectedService);
        navigate(`/request-service/${selectedService}`);
    }   
  };

  if (loading) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center'>
        <div className='flex flex-col items-center gap-4'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500'></div>
          <p className='text-lg text-gray-600'>Loading services...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center'>
        <div className='flex flex-col items-center gap-4'>
          <p className='text-lg text-red-600'>Error loading services: {error.message}</p>
          <button 
            onClick={() => window.location.reload()} 
            className='bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200'
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center p-4'>
      <div className='flex flex-col md:flex-row gap-6 mb-8'>
        {services.map((service) => {
          const serviceId = service._id || service.id; // Handle both _id and id
          const isSelected = selectedService === serviceId;
          
          return (
            <div key={serviceId} 
            className={`bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-200 ${
              isSelected ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => handleServiceSelect(serviceId)}>
                <div className='relative'>
                  <img src={service.image} alt={service.name} className='w-[310px] h-[310px] object-contain' />
                  {isSelected && (
                    <div className='absolute top-2 right-2 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center'>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='flex flex-col gap-2'>
                    <h3 className='text-lg font-medium text-[16px]'>{service.name}</h3>
                    <p className='text-[13px] text-[#4A709C]'>{service.description}</p>
                    </div>
                    <button 
                      className={`w-full font-medium py-2 px-4 rounded-lg transition-colors duration-200 ${
                        isSelected
                          ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                          : 'bg-blue-400 hover:bg-blue-500 text-black'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleServiceSelect(serviceId);
                      }}
                    >
                      {isSelected ? 'Selected' : 'Select'}
                    </button>
                </div>
            </div>
          );
        })}
      </div>
      <div className='flex justify-end w-full max-w-4xl'>
        <button 
          className='bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
          onClick={handleNext}
          disabled={!selectedService}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Services