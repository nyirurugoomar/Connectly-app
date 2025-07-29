import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getServiceById } from '../api/service';
import { createServiceForm } from '../api/serviceForm';
import { useAuth } from '../context/AuthContext';

function RequestService() {
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        date: '',
        additionalNotes: ''
    });
    
    const { serviceId } = useParams();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();
    const today = new Date().toISOString().split('T')[0];

    useEffect(() => {
        const fetchService = async () => {
            try {
                const serviceData = await getServiceById(serviceId);
                setService(serviceData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (serviceId) {
            fetchService();
        }
    }, [serviceId]);

    // Pre-fill form with user data if available
    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user.fullName || '',
                email: user.email || ''
            }));
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!isAuthenticated) {
            alert('Please log in to submit a service request');
            navigate('/signin');
            return;
        }
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Authentication token not found. Please log in again.');
            navigate('/signin');
            return;
        }
    
    
        // Validate required fields
        const requiredFields = ['name', 'email', 'phone', 'address', 'city', 'date', 'additionalNotes'];
        const missingFields = requiredFields.filter(field => !formData[field].trim());
        
        if (missingFields.length > 0) {
            alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
            return;
        }

        if (!date) {
            alert('Please select date');
            return;
        }

        setSubmitting(true);
        
        try {
            const serviceFormData = {
                serviceId: serviceId,
                ...formData,
                date: new Date(formData.date).toISOString()
            };

            const response = await createServiceForm(serviceFormData);
            console.log('Service form submitted:', response);
            // Show success message and redirect
            navigate('/request-history'); // or wherever you want to redirect after submission
            
        } catch (error) {
            console.error('Error submitting service form:', error);
            alert(`Error submitting request: ${error.message || 'Something went wrong'}`);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className='flex flex-col items-center justify-center min-h-screen'>
                <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500'></div>
                <p className='text-lg text-gray-600 mt-4'>Loading service details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className='flex flex-col items-center justify-center min-h-screen'>
                <p className='text-lg text-red-600'>Error: {error}</p>
            </div>
        );
    }

    return (
        <div className='flex flex-col mx-10 md:mx-20'>
            <h1 className='text-[16px] text-[#4A709C] font-medium'>
                Requests <span className='text-black font-medium'>/ {service?.name}</span>
            </h1>

            <div className='flex flex-col gap-4 mt-20'>
                <div className='flex flex-col'>
                    <h1 className='text-[40px] text-black font-bold'>{service?.name} Request</h1>
                    <p className='text-[14px] text-[#4A709C]'>{service?.description}</p>
                    <p className='text-[14px] text-[#4A709C]'>Please fill out the form below to submit your request. Your profile information will be pre-filled and read-only.</p>
                </div>

                <div className=''>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                        <div className='flex flex-col gap-4'>
                           <h1 className='text-[24px] text-black font-medium'>Customer Information</h1> 
                           <div className='flex flex-col gap-2'>
                                <label htmlFor="name" className='text-[16px] text-black font-medium'>Name *</label>
                                <input 
                                type="text" 
                                id="name" 
                                value={formData.name}
                                onChange={handleInputChange}
                                className='w-[448px] bg-[#E7E7E7] p-2 border-none rounded-md outline-none'
                                placeholder='Enter your name'
                                required
                                />
                           </div>
                           <div className='flex flex-col gap-2'>
                                <label htmlFor="email" className='text-[16px] text-black font-medium'>Email *</label>
                                <input 
                                type="email" 
                                id="email" 
                                value={formData.email}
                                onChange={handleInputChange}
                                className='w-[448px] bg-[#E7E7E7] p-2 border-none rounded-md outline-none'
                                placeholder='Enter your email'
                                required
                                />
                           </div>
                           <div className='flex flex-col gap-2'>
                                <label htmlFor="phone" className='text-[16px] text-black font-medium'>Phone *</label>
                                <input 
                                type="tel" 
                                id="phone" 
                                value={formData.phone}
                                onChange={handleInputChange}
                                className='w-[448px] bg-[#E7E7E7] p-2 border-none rounded-md outline-none'
                                placeholder='Enter your phone number'
                                required
                                />
                           </div>
                        </div>
                        <div className='flex flex-col gap-4'>
                            <h1 className='text-[24px] text-black font-medium'>Location Details</h1>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="address" className='text-[16px] text-black font-medium'>Address *</label>
                                <input 
                                type="text" 
                                id="address" 
                                value={formData.address}
                                onChange={handleInputChange}
                                className='w-[448px] bg-[#E7E7E7] p-2 border-none rounded-md outline-none'
                                placeholder='Enter your address'
                                required
                                />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="city" className='text-[16px] text-black font-medium'>City *</label>
                                <input 
                                type="text" 
                                id="city" 
                                value={formData.city}
                                onChange={handleInputChange}
                                className='w-[448px] bg-[#E7E7E7] p-2 border-none rounded-md outline-none'
                                placeholder='Enter your city'
                                required
                                />
                            </div>
                        </div>

                        <div className='flex flex-col gap-4'>
                            <h1 className='text-[24px] text-black font-medium'>Schedule</h1>
                            <div className='flex flex-col gap-4'>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="preferred-date" className='text-[16px] text-black font-medium'>Preferred Date *</label>
                                <input 
                                type="date" 
                                id="date" 
                                value={formData.date}
                                onChange={handleInputChange}
                                min={today}
                                className='w-[448px] bg-[#E7E7E7] p-2 border-none rounded-md outline-none'
                                required
                                />
                            </div>
                        </div>
                        <div className='flex flex-col gap-4'>
                            <label htmlFor="additionalNotes" className='text-[16px] text-black font-medium'>Additional Notes *</label>
                            <textarea 
                            id="additionalNotes" 
                            value={formData.additionalNotes}
                            onChange={handleInputChange}
                            className='w-[448px] h-[228px] bg-[#E7E7E7] p-2 border-none rounded-md outline-none'
                            placeholder='Enter your additional notes'
                            required
                            />
                        </div>
                        </div>

                        <button 
                            type="submit"
                            disabled={submitting}
                            className='text-center bg-blue-400 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                            {submitting ? 'Submitting...' : 'Submit Request'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RequestService;