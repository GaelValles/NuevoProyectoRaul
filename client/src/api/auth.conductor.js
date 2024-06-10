import axios from "axios";

const API = "http://localhost:4000/api/"

export const registerConductor = user => axios.post(`${API}/registrar`, user)