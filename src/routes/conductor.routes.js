import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getConductores, getConductor, postConductores, updateConductor, deleteConductores} from "../controllers/conductor.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema } from "../schemas/conductor.schema.js";
import fileUpload from "express-fileupload";

const router = Router()

router.get('/conductores', authRequired, getConductores)
router.get('/conductor/:id/search', authRequired, getConductor)
router.post("/conductor",fileUpload({ useTempFiles: true, tempFileDir: "./uploads" }), validateSchema(registerSchema),postConductores,);
router.delete('/conductor/:id/delete', authRequired, deleteConductores)
router.put('/conductor/:id/update', authRequired, updateConductor)

export default router;
