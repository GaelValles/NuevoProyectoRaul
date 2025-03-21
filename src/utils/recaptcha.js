import axios from 'axios';

export const verifyRecaptcha = async (token) => {
    const secretKey = 'TU_SECRET_KEY'; // Reemplaza con tu clave secreta de reCAPTCHA
    try {
        const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
            params: {
                secret: secretKey,
                response: token,
            },
        });
        return response.data.success; // Devuelve true si el token es válido
    } catch (error) {
        console.error('Error al verificar reCAPTCHA:', error);
        return false;
    }
};