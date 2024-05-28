import { Router } from "express";
import {registrar, login, logout, perfil} from "../controllers/auth.controller.js"
import { authRequired } from "../middlewares/validateToken.js";
const router = Router()


router.post('/registrar', registrar)
router.post('/login', login)
router.post('/logout', logout)
router.get('/perfil',authRequired, perfil)
export default router