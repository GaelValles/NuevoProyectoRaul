import axios from "./axios";

export const registerCaja = caja => axios.post(`/registrarCaja`, caja)

export const getAllCajas = () => axios.get(`/cajas`);

export const getCajaRequest= (id) => axios.get(`/caja/${id}`);

export const deleteCajaRequest = (id) => axios.delete(`/caja/${id}/delete`);

export const updateCajaRequest = (idcaja) => axios.put(`/caja/${idcaja}/update`)