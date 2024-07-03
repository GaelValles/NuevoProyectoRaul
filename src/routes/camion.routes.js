import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getCamiones, postCamiones, getCamion, updateCamion, deleteCamion } from "../controllers/camion.controller.js";


const router = Router();

router.get('/camiones', authRequired, getCamiones );
router.get('/camion/:id', authRequired, getCamion );
router.post("/registrarCamion", authRequired, postCamiones);
router.delete('/camion/:id/delete', authRequired, deleteCamion);
router.put('/camion/:id/update', authRequired, updateCamion);

export default router;
