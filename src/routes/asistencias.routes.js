import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { 
    createAsistencia, 
    getAsistenciasByMateria, 
    getAsistenciasByAlumno 
} from "../controllers/asistencia.controller.js";

const router = Router();

router.post('/asistencias/:materiaId', authRequired, createAsistencia);
router.get('/asistencias/:materiaId', authRequired, getAsistenciasByMateria);
router.get('/asistencias/alumno/:alumnoId', authRequired, getAsistenciasByAlumno);

export default router;