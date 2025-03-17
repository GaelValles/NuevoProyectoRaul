import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { deleteMateria, getMateria, getMaterias, postMateria, updateMateria } from "../controllers/materia.controller.js";

const router = Router();

router.get('/materias', authRequired, getMaterias );
router.get('/materia/:id', authRequired, getMateria );
router.post("/registrarMateria", authRequired, postMateria);
router.delete('/materia/:id/delete', authRequired, deleteMateria);
router.put('/materia/:id/update', authRequired, updateMateria);

export default router;
