import axios from "axios";

const API = "http://localhost:3000"

<<<<<<< HEAD
export const registerPermiso = doc => axios.post(`${API}/permiso`, doc, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
})
=======
export const registerPermiso = doc => axios.post(`${API}/registrarDocs`, doc)

export const getAllPermisos = () => axios.get(`${API}/permisos`, { withCredentials: true });
>>>>>>> 41e8507045865e9156a96196e2ae6efbfaa7ae07
