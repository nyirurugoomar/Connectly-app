import api from './axios';

export const createServiceForm = async (data) => {
    const response = await api.post('/service-forms', data);
    return response.data;
}

export const getServiceForms = async () => {
    const response = await api.get('/service-forms');
    return response.data;
}

export const getServiceFormById = async (id) => {
    const response = await api.get(`/service-forms/${id}`);
    return response.data;
}

export const updateServiceForm = async (id, data) => {
    const response = await api.put(`/service-forms/${id}`, data);
    return response.data;
}

export const deleteServiceForm = async (id) => {
    const response = await api.delete(`/service-forms/${id}`);
    return response.data;
}