import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { 
    getMateria, 
    getMaterias, 
    createMateria, 
    updateMateria, 
    deleteMateria,
    getMateriasByProfesor,
    getAlumnosByMateria 
} from "../controllers/materia.controller.js";

const router = Router();

router.get("/profesores/:id/materias", authRequired, getMateriasByProfesor);
router.get('/materia/:materiaId/alumnos', authRequired, getAlumnosByMateria);
router.post("/profesores/:id/registrarMaterias", createMateria);
router.get('/materias', authRequired, getMaterias );
router.get('/materia/:id', authRequired, getMateria );
router.delete('/materia/:id/delete', authRequired, deleteMateria);
router.put('/materia/:id/update', authRequired, updateMateria);
router.get("/materia/:id/search", authRequired, getMateria);

export default router;
