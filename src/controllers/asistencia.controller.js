import Asistencia from "../models/asistencia.model.js";
import Materia from "../models/materia.model.js";
import Alumno from "../models/alumno.model.js";

export const createAsistencia = async (req, res) => {
    try {
        const { materiaId } = req.params;
        const { asistencias } = req.body;

        const asistenciasCreadas = await Promise.all(
            asistencias.map(async (asistencia) => {
                const nuevaAsistencia = new Asistencia({
                    materia: materiaId,
                    alumno: asistencia.alumnoId,
                    estado: asistencia.estado
                });
                return await nuevaAsistencia.save();
            })
        );

        res.json(asistenciasCreadas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAsistenciasByMateria = async (req, res) => {
    try {
        const asistencias = await Asistencia.find({ materia: req.params.materiaId })
            .populate('alumno', 'nombreCompleto matricula')
            .sort({ fecha: -1 });
        res.json(asistencias);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAsistenciasByAlumno = async (req, res) => {
    try {
        const asistencias = await Asistencia.find({ alumno: req.params.alumnoId })
            .populate('materia', 'nombre')
            .sort({ fecha: -1 });
        res.json(asistencias);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};