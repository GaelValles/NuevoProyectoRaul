import axios from "./axios";

export const loginRequest = (user) => axios.post(`/login`, user)

export const verifyTokenRequest = async () => axios.get(`/verify`);
        
export const getUserRequest = () => axios.get(`/perfil`);

export const getUsuarioRequest = (id) => axios.get(`/usuario/${id}`);

export const updateUsuarioRequest = (id, formData) => {
    console.log("Datos enviados al backend:", formData);
    return axios.put(`/usuario/${id}/update`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const logoutRequest = () => axios.post(`/logout`)

