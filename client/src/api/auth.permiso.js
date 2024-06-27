import axios from "axios";

const API = "http://localhost:3000"

export const registerPermiso = doc => axios.post(`${API}/registrarDocs`, doc)

export const getAllPermisos = () => axios.get(`${API}/permisos`, { withCredentials: true });