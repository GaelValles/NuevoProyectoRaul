import axios from './axios';


export const registerConductor = (conductor) => axios.post('/conductor', conductor, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});
export const getAllConductors = () => axios.get(`/conductores`);

export const getConductorRequest= (id) => axios.get(`/conductor/${id}`);

export const deleteConductorRequest = (id) => axios.delete(`/conductor/${id}/delete`);

export const restoreUserRequest = async (id) => {
    try {
        await axios.put(`/restaurarUsuario/${id}`);
    } catch (error) {
        console.error("Error al restaurar el conductor:", error);
        throw new Error("Error al restaurar el conductor");
    }
};

export const getConductorFilesRequest = (idconductor) => axios.get(`/conductor/${idconductor}/files`);

export const updateConductorRequest = (id, formData) => {
    console.log("Datos enviados al backend:", formData);
    return axios.put(`/conductor/${id}/update`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

