import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
    getPermisos,
    postPermiso,
    updatePermiso,
    deletePermiso,
  } from "../controllers/permiso.controller.js";
import fileUpload from "express-fileupload";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { docSchema } from "../schemas/docs.schemas.js";
const router = Router()

router.get("/permisos", authRequired, getPermisos);
router.post("/permiso", validateSchema(docSchema), fileUpload({ useTempFiles: true, tempFileDir: "./uploads" }), postPermiso);
router.put("/permiso/:id/update", authRequired, updatePermiso);
router.delete("/permiso/:id/delete", authRequired, deletePermiso);

export default router;