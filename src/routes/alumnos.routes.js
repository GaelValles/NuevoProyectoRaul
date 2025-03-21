import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {getAlumno, getAlumnos, postAlumnos, updateAlumno, getAlumnosByMateria, deleteAlumno} from "../controllers/alumno.controller.js";
import fileUpload from "express-fileupload";


const router = Router();

router.get('/alumnos', authRequired, getAlumnos);
router.get('/alumno/:id/search', authRequired, getAlumno);
router.post("/registrarAlumno", fileUpload({ useTempFiles: true, tempFileDir: "./uploads" }),postAlumnos);
router.delete('/alumno/:id/delete', authRequired, deleteAlumno);
router.get('/materia/:materiaId/alumnos', authRequired, getAlumnosByMateria);
router.put("/alumno/:id/update", authRequired, fileUpload({ useTempFiles: true, tempFileDir: "./uploads" }), updateAlumno);
export default router;
