import axios from './axios';

export const createAsistenciaRequest = async (materiaId, asistenciasData) => 
    axios.post(`/asistencias/${materiaId}`, asistenciasData);

export const getAsistenciasByMateriaRequest = async (materiaId) =>
    axios.get(`/asistencias/${materiaId}`);

export const getAsistenciasByAlumnoRequest = async (alumnoId) =>
    axios.get(`/asistencias/alumno/${alumnoId}`);

export const getAlumnosByMateriaRequest = async (materiaId) => 
    axios.get(`/materia/${materiaId}/alumnos`);

export const updateAsistenciaRequest = async (asistenciaId, data) =>
    axios.put(`/asistencias/${asistenciaId}`, data);