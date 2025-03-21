import axios from 'axios';
import querystring from 'querystring';
import { config } from 'dotenv';
config();

export const verifyRecaptcha = async (token) => {
    try {
        console.log('Attempting to verify token:', token.substring(0, 20) + '...');
        
        const data = querystring.stringify({
            secret: process.env.RECAPTCHA_SECRET_KEY,
            response: token
        });

        const response = await axios({
            method: 'POST',
            url: 'https://www.google.com/recaptcha/api/siteverify',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        });

        console.log('Google reCAPTCHA API response:', response.data);

        if (!response.data.success) {
            console.error('reCAPTCHA verification failed:', response.data['error-codes']);
        }

        return response.data.success;
    } catch (error) {
        console.error('Error verifying reCAPTCHA:', error.message);
        return false;
    }
};