import axios from './axios';

export const loginAlumnoRequest = (alumno) => axios.post(`/loginAlumno`, alumno);
export const registerAlumno = (alumno) => axios.post(`/registrarAlumno`, alumno);
export const getAlumnoRequest = (id) => axios.get(`/alumno/${id}`);
export const updateAlumnoRequest = (id, alumnoData) => axios.put(`/alumno/${id}/update`, alumnoData);
export const getAlumnosByFilterRequest = (materiaId) => axios.get(`/materia/${materiaId}/alumnos`);