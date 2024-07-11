import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getCajas, postCajas, getCaja, deleteCaja, updateCaja } from "../controllers/caja.controller.js";

const router = Router();

router.get('/cajas', authRequired, getCajas );
router.get('/caja/:id', authRequired, getCaja );
router.post("/registrarCaja", authRequired, postCajas);
router.delete('/caja/:id/delete', authRequired, deleteCaja);
router.put('/caja/:id/update', authRequired, updateCaja);

export default router;
