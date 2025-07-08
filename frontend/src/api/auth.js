import api from './axios';

export const signup = async (data) => {
    const response = await api.post('/users/signup', data);
    return response.data;
};

export const signin = async (data) => {
    const response = await api.post('/users/signin', data);
    return response.data;
};