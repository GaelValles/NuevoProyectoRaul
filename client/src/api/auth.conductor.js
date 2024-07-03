import axios from './axios';


export const registerConductor = (conductor) => axios.post('/conductor', conductor, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});
export const getAllConductors = () => axios.get(`/conductores`);

export const getConductorRequest= (id) => axios.get(`/conductor/${id}`);
