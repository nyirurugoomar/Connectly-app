import api from './axios';

export const getUserInfo = async () => {
    const response = await api.get('/user-info/me');
    return response.data;
}

export const createUserInfo = async (data) => {
    const response = await api.post('/user-info', data);
    return response.data;
}

export const updateUserInfo = async (id, data) => {
    const response = await api.put(`/user-info/${id}`, data);
    return response.data;
}

export const deleteUserInfo = async (id) => {
    const response = await api.delete(`/user-info/${id}`);
    return response.data;
}