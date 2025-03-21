import axios from './axios';

export const getMateriaRequest = async (id) => 
    axios.get(`/materia/${id}/search`);

export const createMateriaRequest = async (profesorId, materia) => 
    axios.post(`/profesores/${profesorId}/registrarMaterias`, materia);

export const getMateriasByProfesorRequest = async (profesorId) => 
    axios.get(`/profesores/${profesorId}/materias`);

export const updateMateriaRequest = async (materiaId, materia) => 
    axios.put(`/materia/${materiaId}/update`, materia);

export const deleteMateriaRequest = async (materiaId) => 
    axios.delete(`/materia/${materiaId}/delete`);