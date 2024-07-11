import Caja from "../models/caja.model.js";

// Obtener todas las cajas

export const getCajas = async (req, res) => {
  try {
      const cajas = await Caja.find({user:req.user.id}).populate('user');
      res.json(cajas);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

// Registrar una caja
export const postCajas = async (req, res) => {
    const {  placas, numEco, marca, anio, numSerie } = req.body;
  try {
    const newCaja = new Caja({ placas, numEco, marca, anio, numSerie,  user: req.user.id });

    const savedCaja = await newCaja.save();
    res.json(savedCaja);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Obtener solo una caja por id
export const getCaja = async (req, res) => {
  try {
    const caja = await Caja.findById(req.params.id);
    if (!caja) {
      return res.status(404).json({ message: "Caja no encontrada" });
    }
    res.json(caja);
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener el caja",
      error,
    });
  }
};

//Actualizar datos de la caja
export const updateCaja = async (req, res) => {
  const { id } = req.params;
  const { placas, numEco, marca, anio, numSerie } = req.body;

  try {
      const caja = await Caja.findByIdAndUpdate(id, {
          placas,
          numEco,
          marca,
          anio,
          numSerie
      }, { new: true });

      if (!caja) {
          return res.status(404).json({ message: 'Caja no encontrada' });
      }

      res.json(caja);
  } catch (error) {
      res.status(500).json({ message: 'Error al actualizar la caja', error });
  }
};

//Eliminar caja
export const deleteCaja = async (req, res) => {
  try {
    const caja = await Caja.findByIdAndDelete(req.params.id);

    if (!caja)
      return res.status(404).json({ message: "Caja no encontrado" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: "Error al eliminar la caja",
      error,
    });
  }
};
