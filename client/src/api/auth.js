import axios from "axios";


export const loginRequest = user => axios.post(`http://localhost:3000/login`, user)