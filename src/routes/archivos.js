import express from 'express';
import upload from '../middlewares/multer.middleware'; // Asegúrate de tener el middleware en la ruta correcta
import Conductor from '../models/conductor.model';

const router = express.Router();

router.post('/registrar-conductor', upload.fields([
    { name: 'solicitud', maxCount: 1 },
    { name: 'ine', maxCount: 1 },
    { name: 'visa', maxCount: 1 },
    { name: 'fast', maxCount: 1 },
    { name: 'antidoping', maxCount: 1 },
    { name: 'antecedentes', maxCount: 1 },
    { name: 'domicilio', maxCount: 1 },
    { name: 'psicofisico', maxCount: 1 },
    { name: 'aduana', maxCount: 1 }
]), async (req, res) => {
    try {
        const { nombre, fechaNacimiento, numLicencia, numVisa, numGafete, user } = req.body;

        const newConductor = new Conductor({
            nombre,
            fechaNacimiento,
            numLicencia,
            numVisa,
            numGafete,
            solicitud: req.files['solicitud'][0].path,
            ine: req.files['ine'][0].path,
            visa: req.files['visa'][0].path,
            fast: req.files['fast'][0].path,
            antidoping: req.files['antidoping'][0].path,
            antecedentes: req.files['antecedentes'][0].path,
            domicilio: req.files['domicilio'][0].path,
            psicofisico: req.files['psicofisico'][0].path,
            aduana: req.files['aduana'][0].path,
            user
        });

        await newConductor.save();
        res.status(201).json(newConductor);
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar el conductor' });
    }
});

export default router;
