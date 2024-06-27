import Conductor from "../models/conductor.model.js";
import {
  uploadSolicitud,
  uploadIne,
  uploadVisa,
  uploadFast,
  uploadAntidoping,
  uploadAntecedentes,
  uploadDomicilio,
  uploadPsicofisico,
  uploadAduana,
  deleteFile,
} from "../libs/cloudinary.js";
import fs from "fs-extra";

// Función auxiliar para subir archivos
const uploadFile = async (file, uploadFunction) => {
  const result = await uploadFunction(file.tempFilePath);
  await fs.unlink(file.tempFilePath);
  return {
    public_id: result.public_id,
    secure_url: result.secure_url,
  };
};

// Obtener todos los conductores

export const getConductors = async (req, res) => {
  try {
      const conductors = await Conductor.find();
      res.json(conductors);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

export const deleteConductor = async (req, res) => {
  try {
      const { id } = req.params;
      await Conductor.findByIdAndDelete(id);
      res.status(204).send();
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};
// Obtener un conductor por id
export const getConductor = async (req, res) => {
  try {
    const conductor = await Conductor.findById(req.params.id);
    if (!conductor) {
      return res.status(404).json({ message: "Conductor no encontrado" });
    }
    res.json(conductor);
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener el conductor",
      error,
    });
  }
};

// Crear un conductor
export const postConductores = async (req, res) => {
  try {
    const { nombre, fechaNacimiento, numLicencia, numVisa, numGafete } = req.body;
    const newConductor = new Conductor({ nombre, fechaNacimiento, numLicencia, numVisa, numGafete });

    const fileUploads = {
      solicitud: uploadSolicitud,
      ine: uploadIne,
      visa: uploadVisa,
      fast: uploadFast,
      antidoping: uploadAntidoping,
      antecedentes: uploadAntecedentes,
      domicilio: uploadDomicilio,
      psicofisico: uploadPsicofisico,
      aduana: uploadAduana,
    };

    for (const [key, uploadFunction] of Object.entries(fileUploads)) {
      if (req.files?.[key]) {
        newConductor[key] = await uploadFile(req.files[key], uploadFunction);
      }
    }

    const savedConductor = await newConductor.save();
    res.json(savedConductor);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Actualizar un conductor por id
export const updateConductor = async (req, res) => {
  try {
    const conductor = await Conductor.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
    );

    if (!conductor) {
      return res.status(404).json({ message: "Conductor no encontrado" });
    }

    res.json(conductor);
  } catch (error) {
    return res.status(500).json({
      message: "Error al actualizar el conductor",
      error,
    });
  }
};

// Eliminar un conductor por id
export const deleteConductores = async (req, res) => {
  try {
    const conductor = await Conductor.findByIdAndDelete(req.params.id);

    if (!conductor) {
      return res.status(404).json({ message: "Conductor no encontrado" });
    }

    const fileFields = [
      "solicitud",
      "ine",
      "visa",
      "fast",
      "antidoping",
      "antecedentes",
      "domicilio",
      "psicofisico",
      "aduana",
    ];

    for (const field of fileFields) {
      if (conductor[field]) {
        await deleteFile(conductor[field].public_id);
      }
    }

    return res.json(conductor);
  } catch (error) {
    return res.status(500).json({
      message: "Error al eliminar el conductor",
      error,
    });
  }
};
