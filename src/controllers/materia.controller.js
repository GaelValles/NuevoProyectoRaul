import Materia from "../models/materia.model.js";

// Obtener todas las materias

export const getMaterias = async (req, res) => {
  try {
      const materias = await Materia.find({profesor:req.user.id}).populate('profesor');
      res.json(materias);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

// Registrar una materia
export const postMateria = async (req, res) => {
    const {  nombre, grado, grupo } = req.body;
  try {
    const newMateria = new Materia({ nombre, grado, grupo,  profesor: req.user.id });

    const savedMateria = await newMateria.save();
    res.json(savedMateria);
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
  const { id } = req.params;
  const { nombre, grado, grupo } = req.body;

  try {
      const materia = await Materia.findByIdAndUpdate(id, {
        nombre,
        grado,
        grupo
      }, { new: true });

      if (!materia) {
          return res.status(404).json({ message: 'Materia no encontrada' });
      }

      res.json(materia);
  } catch (error) {
      res.status(500).json({ message: 'Error al actualizar la materia', error });
  }
};

//Eliminar materia
export const deleteMateria = async (req, res) => {
  try {
    const materia = await Materia.findByIdAndDelete(req.params.id);

    if (!materia)
      return res.status(404).json({ message: "Materia no encontrado" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: "Error al eliminar la materia",
      error,
    });
  }
};
