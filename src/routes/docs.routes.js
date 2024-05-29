import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getdocs, getdoc, createdocs, updatedocs, deletedocs } from "../controllers/docs.controller.js";
const router = Router()

router.get('/docs', authRequired, getdocs)
router.get('/docs/:id', authRequired, getdoc)
router.post('/docs', authRequired, createdocs)
router.delete('/docs:id', authRequired, deletedocs)
router.put('/docs', authRequired, updatedocs)


export default router