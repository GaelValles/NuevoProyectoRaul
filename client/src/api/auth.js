import axios from "axios";


export const loginRequest = user => axios.post(`http://localhost:3000/login`, user)

export const getAllConductors = () => axios.get('http://localhost:3000/conductores', { withCredentials: true });