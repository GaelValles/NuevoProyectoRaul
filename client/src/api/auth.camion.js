import axios from "./axios";

export const registerCamion = camion => axios.post(`/registrarCamion`, camion)

export const getAllCamiones = () => axios.get(`/camiones`);

export const getCamionRequest= (id) => axios.get(`/camion/${id}`);

export const deleteCamionRequest = (id) => axios.delete(`/camion/${id}/delete`);