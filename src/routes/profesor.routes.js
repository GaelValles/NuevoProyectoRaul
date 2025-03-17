import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import fileUpload from "express-fileupload";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerProfesorSchema } from "../schemas/profesor.schema.js";
import { getProfesores, loginProfesor } from "../controllers/profesor.controller.js";
import { GetProfesor } from "../controllers/profesor.controller.js";
import { cambioStatus } from "../controllers/profesor.controller.js";
import { deleteProfesor } from "../controllers/profesor.controller.js";
import { postProfesor } from "../controllers/profesor.controller.js";
import { updateProfesor } from "../controllers/profesor.controller.js";

const router = Router()

router.get("/profesores", authRequired, getProfesores);
router.get("/profesor/:id", authRequired, GetProfesor);
router.post("/registrarPermiso", authRequired, fileUpload({ useTempFiles: true, tempFileDir: "./uploads" }), postProfesor);
router.put("/profesor/:id/update", authRequired, fileUpload({ useTempFiles: true, tempFileDir: "./uploads" }), updateProfesor);
router.put("/profesor/:id/status", authRequired, cambioStatus);
router.delete("/profesor/:id/delete", authRequired, deleteProfesor);
router.post('/loginProfesor', loginProfesor)
export default router;