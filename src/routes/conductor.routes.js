import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getConductors,
  getConductor,
  postConductores,
  updateConductor,
  deleteConductores,
  getConductorFiles
} from "../controllers/conductor.controller.js";
import fileUpload from "express-fileupload";


const router = Router();

router.get('/conductores', authRequired, getConductors);
router.get('/conductor/:id', authRequired, getConductor);
router.post("/conductor", authRequired, fileUpload({ useTempFiles: true, tempFileDir: "./uploads" }), postConductores);
router.delete('/conductor/:id/delete', authRequired, deleteConductores);
router.put('/conductor/:id/update', authRequired, updateConductor);
router.get('/conductor/:id/files', authRequired, getConductorFiles);

export default router;
