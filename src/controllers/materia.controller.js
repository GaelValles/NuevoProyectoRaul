import Materia from "../models/materia.model.js";
import Profesor from "../models/profesor.model.js";

// Obtener todas las materias

export const getMaterias = async (req, res) => {
  try {
      const materias = await Materia.find({profesor:req.user.id}).populate('profesor');
      res.json(materias);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

// Obtener materias por profesor
export const getMateriasByProfesor = async (req, res) => {
    try {
        const materias = await Materia.find({ profesor: req.params.id })
            .populate('profesor', 'nombre_completo');
        res.json(materias);
    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener las materias",
            error: error.message
        });
    }
};


// Crear una materia
export const createMateria = async (req, res) => {
    try {
        const { nombre, grado, grupo } = req.body;
        const profesor = req.params.id;

        const profesorExists = await Profesor.findById(profesor);
        if (!profesorExists) {
            return res.status(404).json({
                message: "Profesor no encontrado"
            });
        }

        const newMateria = new Materia({
            nombre,
            grado,
            grupo,
            profesor
        });

        const savedMateria = await newMateria.save();
        res.json(savedMateria);
    } catch (error) {
        return res.status(500).json({
            message: "Error al crear la materia",
            error: error.message
        });
    }
};

//Obtener solo una materia por id
export const getMateria = async (req, res) => {
  try {
    const materia = await Materia.findById(req.params.id);
    if (!materia) {
      return res.status(404).json({ message: "Materia no encontrada" });
    }
    res.json(materia);
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener el materia",
      error,
    });
  }
};

//Actualizar datos de la materia
export const updateMateria = async (req, res) => {
    try {
        const updatedMateria = await Materia.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedMateria) {
            return res.status(404).json({
                message: "Materia no encontrada"
            });
        }
        res.json(updatedMateria);
    } catch (error) {
        return res.status(500).json({
            message: "Error al actualizar la materia",
            error: error.message
        });
    }
};

//Eliminar materia
export const deleteMateria = async (req, res) => {
    try {
        const deletedMateria = await Materia.findByIdAndDelete(req.params.id);
        if (!deletedMateria) {
            return res.status(404).json({
                message: "Materia no encontrada"
            });
        }
        res.json({ message: "Materia eliminada correctamente" });
    } catch (error) {
        return res.status(500).json({
            message: "Error al eliminar la materia",
            error: error.message
        });
    }
};

export const getAlumnosByMateria = async (req, res) => {
    try {
        const { materiaId } = req.params;
        
        // Verify materiaId is received
        console.log('MateriaID received:', materiaId);
        
        const materia = await Materia.findById(materiaId);
        if (!materia) {
            return res.status(404).json({ message: "Materia no encontrada" });
        }

        const alumnos = await Alumno.find({
            grado: materia.grado,
            grupo: materia.grupo
        });

        // Log found students
        console.log('Alumnos encontrados:', alumnos.length);
        
        return res.json(alumnos);
    } catch (error) {
        console.error('Error en getAlumnosByMateria:', error);
        return res.status(500).json({ message: error.message });
    }
};
