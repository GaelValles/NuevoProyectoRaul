import axios from "./axios";


export const loginProfesorRequest = (profesor) => axios.post(`/loginProfesor`, profesor)

export const registerProfesor = profesor => axios.post(`/registrarProfesor`, profesor)

export const getAllProfesores = () => axios.get(`/profesores`);

export const getProfesorRequest= (id) => axios.get(`/profesor/${id}`);

export const deleteProfesorRequest = (id) => axios.delete(`/profesor/${id}/delete`);

export const updateProfesorRequest = async (id, profesorData) => axios.put(`/profesor/${id}/update`, profesorData);