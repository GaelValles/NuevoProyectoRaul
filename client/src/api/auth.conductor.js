import axios from 'axios';

export const registerConductor = (conductor) => axios.post('http://localhost:3000/conductor', conductor, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});