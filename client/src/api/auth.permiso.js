import axios from "./axios";

export const registerPermiso = doc => axios.post(`/registrarPermiso`,doc, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
})

export const getAllPermisos = () => axios.get(`/permisos`);

export const getPermisoRequest= (id) => axios.get(`/permiso/${id}`);

export const deletePermisoRequest = (id) => axios.delete(`/permiso/${id}/delete`);

export const UpdateStatusRequest = (idpermiso, status) => axios.put(`/permiso/${idpermiso}/status`, { status });

export const updatePermisoRequest = (id, formData) => {
    console.log("Datos enviados al backend:", formData);
    return axios.put(`/permiso/${id}/update`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

