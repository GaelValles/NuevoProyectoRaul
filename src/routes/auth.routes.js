import { Router } from "express";
import {registrar, login, logout, perfil, verifyToken, getUsuario, updateUsuario} from "../controllers/auth.controller.js"
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema } from "../schemas/auth.schema.js";
import fileUpload from "express-fileupload";
import { verifyRecaptcha } from '../utils/recaptcha.js';

const router = Router()

 
router.post('/registrar', fileUpload({ useTempFiles: true, tempFileDir: "./uploads"}), registrar)
router.put("/usuario/:id/update", authRequired, fileUpload({ useTempFiles: true, tempFileDir: "./uploads" }), updateUsuario);
router.post('/login', async (req, res) => {
    const { email, password, recaptchaToken } = req.body;

    // Verificar el token de reCAPTCHA
    const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
    if (!isRecaptchaValid) {
        return res.status(400).json({ message: 'reCAPTCHA no válido. Por favor, inténtalo de nuevo.' });
    }

    // Aquí va tu lógica de autenticación (verificar email y contraseña)
    try {
        // Ejemplo de autenticación
        if (email === 'test@example.com' && password === '123456') {
            return res.status(200).json({ message: 'Inicio de sesión exitoso' });
        } else {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }
    } catch (error) {
        console.error('Error en el login:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});
router.get('/perfil', authRequired, perfil);
router.get("/usuario/:id", authRequired, getUsuario);
router.get('/verify', verifyToken);
router.post('/logout',authRequired, logout)

export default router