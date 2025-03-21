import axios from './axios';

export const loginAdminRequest = (admin) => 
    axios.post('/loginAdmin', admin);

export const registerAdminRequest = (admin) => axios.post(`/registrarAdmin`, admin);
export const verifyTokenRequest = () => axios.get('/verify');
export const logoutRequest = () => axios.post('/logout');