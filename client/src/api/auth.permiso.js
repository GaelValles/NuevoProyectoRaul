import axios from "axios";

const API = "http://localhost:3000"

export const registerPermiso = doc => axios.post(`${API}/permiso`, doc, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
})