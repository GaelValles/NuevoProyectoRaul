import axios from "./axios";

export const loginRequest = (user) => axios.post(`/login`, user)

export const verifyTokenRequest = async () => axios.get(`/verify`);
        
export const getUserRequest = () => axios.get(`/perfil`);

export const logoutRequest = () => axios.post(`/logout`)

