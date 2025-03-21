import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { 
    createAsistencia, 
    getAsistenciasByMateria, 
    getAsistenciasByAlumno,
    getAlumnosByMateria
} from "../controllers/asistencia.controller.js";

const router = Router();

router.post('/asistencias/:materiaId', authRequired, createAsistencia);
router.get('/asistencias/:materiaId', authRequired, getAsistenciasByMateria);
router.get('/asistencias/alumno/:alumnoId', authRequired, getAsistenciasByAlumno);
router.get('/asistencias/:materiaId/alumnos', authRequired, getAlumnosByMateria);
router.get('/asistencias/:id/alumnos', authRequired, getAlumnosByMateria);

export default router;