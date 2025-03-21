import { Router } from "express";
import { 
    registrarAdmin, 
    loginAdmin, 
    logout
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema } from "../schemas/auth.schema.js";
import fileUpload from "express-fileupload";
import { verifyRecaptcha } from '../utils/recaptcha.js';

const router = Router()

router.post('/registrarAdmin', registrarAdmin);
router.post('/loginAdmin', loginAdmin);
router.post('/logoutAdmin', authRequired, logout);

export default router;