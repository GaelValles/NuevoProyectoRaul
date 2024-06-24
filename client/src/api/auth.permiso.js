import axios from "axios";

const API = "http://localhost:4000/api/"

export const registerPermiso = doc => axios.post(`${API}/registrarDocs`, doc)