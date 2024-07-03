import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getPermisos, getPermiso, postPermiso, updatePermiso, deletePermiso } from "../controllers/permiso.controller.js";
import fileUpload from "express-fileupload";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { docSchema } from "../schemas/permiso.schemas.js";

const router = Router()

router.get("/permisos", authRequired, getPermisos);
router.get("/permiso/:id", authRequired, getPermiso);
router.post("/registrarPermiso", authRequired, fileUpload({ useTempFiles: true, tempFileDir: "./uploads" }), postPermiso);
router.put("/permiso/:id/update", authRequired, updatePermiso);
router.delete("/permiso/:id/delete", authRequired, deletePermiso);

export default router;