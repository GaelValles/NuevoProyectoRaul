import Camion from "../models/camion.model.js";

// Obtener todos los camiones
export const getCamiones = async (req, res) => {
  try {
      const camiones = await Camion.find({user:req.user.id}).populate('user');
      res.json(camiones);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

// Agregar un camion
export const postCamiones = async (req, res) => {
    const { marca, modelo, color, placasMx, placasUsa, numEco, numSerie, mantenimiento } = req.body;
  try {
    const newCamion = new Camion({ marca, modelo, color, placasMx, placasUsa, numEco, numSerie, mantenimiento, user: req.user.id });

    const savedCamion = await newCamion.save();
    res.json(savedCamion);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Obtener solo un camion por id
export const getCamion = async (req, res) => {
  try {
    const camion = await Camion.findById(req.params.id);
    if (!camion) {
      return res.status(404).json({ message: "Camion no encontrado" });
    }
    res.json(camion);
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener el camion",
      error,
    });
  }
};

//Actualizar datos del camion
export const updateCamion = async (req, res) => {
  const camion = await Camion.findByIdAndUpdate(req.params.id, req.body, {new:true})
  if (!camion) return res.status(404).json({message: "Camion no encontrado"})
  res.json(camion)
};

//Eliminar camion
export const deleteCamion = async (req, res) => {
  try {
    const camion = await Camion.findByIdAndDelete(req.params.id);

    if (!camion)
      return res.status(404).json({ message: "Camion no encontrado" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: "Error al eliminar el camion",
      error,
    });
  }
};

