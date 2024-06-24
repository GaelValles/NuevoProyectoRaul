import axios from "axios";

const API = "http://localhost:4000/api/"

export const registerConductor = conductor => axios.post(`${API}/registrar`, conductor)