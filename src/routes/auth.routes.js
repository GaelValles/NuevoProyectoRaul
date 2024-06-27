import { Router } from "express";
import {registrar, login, logout, perfil} from "../controllers/auth.controller.js"
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema } from "../schemas/auth.schema.js";
import fileUpload from "express-fileupload";

const router = Router()


router.post('/registrar',
    fileUpload({
      useTempFiles: true,
      tempFileDir: "./uploads",
    }), registrar)
router.post('/login', validateSchema(loginSchema), login)
router.post('/logout', logout)
router.get('/perfil',authRequired, perfil)
export default router