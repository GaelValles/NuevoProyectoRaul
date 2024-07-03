import { Router } from "express";
import {registrar, login, logout, perfil, verifyToken} from "../controllers/auth.controller.js"
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema } from "../schemas/auth.schema.js";
import fileUpload from "express-fileupload";

const router = Router()

 
router.post('/registrar', fileUpload({ useTempFiles: true, tempFileDir: "./uploads"}), registrar)
router.post('/login', validateSchema(loginSchema), login)
router.get('/perfil', authRequired, perfil);
router.get('/verify', verifyToken);
router.post('/logout',authRequired, logout)

export default router