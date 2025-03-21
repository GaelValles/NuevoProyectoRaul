import axios from "./axios";

export const loginAlumnoRequest = (alumno) => axios.post(`/loginAlumno`, alumno)

export const registerAlumno = alumno => axios.post(`/registrarAlumno`, alumno)

export const getAllAlumnos = () => axios.get(`/cajas`);

export const getAlumnoRequest= (id) => axios.get(`/alumno/${id}`);

export const deleteAlumnoRequest = (id) => axios.delete(`/alumno/${id}/delete`);

export const updateAlumnoRequest = async (id, alumnoData) => axios.put(`/alumno/${id}/update`, alumnoData);

export const getAlumnosByFilterRequest = async (filters) => 
    axios.post('/alumnos/filter', filters);