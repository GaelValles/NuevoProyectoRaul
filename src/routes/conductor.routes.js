import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getConductores, getConductor, registrarConductor, updateConductor, deleteConductor} from "../controllers/conductor.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema } from "../schemas/conductor.schema.js";
const router = Router()

router.get('/conductores', authRequired, getConductores)
router.get('/conductor/:id', authRequired, getConductor)
router.post('/registrarConductor', authRequired, validateSchema(registerSchema), registrarConductor)
router.delete('/conductor/:id', authRequired, deleteConductor)
router.put('/conductor/:id', authRequired, updateConductor)

export default router