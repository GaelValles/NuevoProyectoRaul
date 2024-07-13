import Conductor from "../models/conductor.model.js";
import JSZip from "jszip";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import {
  uploadSolicitud,
  uploadIne,
  uploadVisa,
  uploadFast,
  uploadAntidoping,
  uploadAntecedentes,
  uploadDomicilio,
  uploadPsicofisico,
  uploadEscuela,
  deleteFile,
  download
} from "../libs/cloudinary.js";
import fs from "fs-extra";
import asyncHandler from 'express-async-handler';

cloudinary.config({
  cloud_name: "dftu2fjzj",
  api_key: "946929268796721",
  api_secret: "mQ0AiZEdxcmd7RLyhOB2KclWHQA",
  secured: true,
});

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
      const conductors = await Conductor.find({user:req.user.id}).populate('user');
      res.json(conductors);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

// Crear un conductor
export const postConductores = async (req, res) => {
    const { nombre, fechaNacimiento, numLicencia, numVisa, numGafete } = req.body;
  try {
    const newConductor = new Conductor({ nombre, fechaNacimiento, numLicencia, numVisa, numGafete, user: req.user.id });

    const fileUploads = {
      solicitud: uploadSolicitud,
      ine: uploadIne,
      visa: uploadVisa,
      fast: uploadFast,
      antidoping: uploadAntidoping,
      antecedentes: uploadAntecedentes,
      domicilio: uploadDomicilio,
      psicofisico: uploadPsicofisico,
      escuela: uploadEscuela,
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

export const deleteConductor = async (req, res) => {
  try {
      const { id } = req.params;
      await Conductor.findByIdAndDelete(id);
      res.status(204).send();
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

// Actualizar un conductor por id
export const updateConductor = async (req, res, next) => {
  try {
      const conductorActual = await Conductor.findById(req.params.id);

      if (!conductorActual) {
          return res.status(404).json({ message: 'Conductor no encontrado' });
      }

      const { nombre, fechaNacimiento, numLicencia, numVisa, numGafete } = req.body;
      const data = {
          nombre,
          fechaNacimiento,
          numLicencia,
          numVisa,
          numGafete
      };
      console.log("Esto llega",data)
      
      const fileUploads = {
          solicitud: uploadSolicitud,
          ine: uploadIne,
          visa: uploadVisa,
          fast: uploadFast,
          antidoping: uploadAntidoping,
          antecedentes: uploadAntecedentes,
          domicilio: uploadDomicilio,
          psicofisico: uploadPsicofisico,
          escuela: uploadEscuela,
      };

      for (const [key, uploadFunction] of Object.entries(fileUploads)) {
          if (req.files && req.files[key]) {
              const imgId = conductorActual[key]?.public_id;
              if (imgId) {
                  await deleteFile(imgId);
              }

              const newImage = await uploadFunction(req.files[key].tempFilePath);
              data[key] = {
                  public_id: newImage.public_id,
                  secure_url: newImage.secure_url
              };

              await fs.unlink(req.files[key].tempFilePath); // Eliminar el archivo temporal
          }
      }
      console.log(data)

      const conductorUpdated = await Conductor.findByIdAndUpdate(req.params.id, data, { new: true });

      return res.status(200).json(conductorUpdated);

  } catch (error) {
      console.error("Error al actualizar el conductor:", error);
      res.status(500).json({
          message: "Error al actualizar el conductor",
          error,
      });
      next(error);
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
      "escuela",
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

export const getConductorFiles = async (req, res) => {
  try {
    const conductor = await Conductor.findById(req.params.id);
    if (!conductor) {
      return res.status(404).json({ message: 'Conductor no encontrado.' });
    }

    const files = [
      { name: 'solicitud', public_id: conductor.solicitud.public_id },
      { name: 'ine', public_id: conductor.ine.public_id },
      { name: 'visa', public_id: conductor.visa.public_id },
      { name: 'fast', public_id: conductor.fast.public_id },
      { name: 'antidoping', public_id: conductor.antidoping.public_id },
      { name: 'antecedentes', public_id: conductor.antecedentes.public_id },
      { name: 'domicilio', public_id: conductor.domicilio.public_id },
      { name: 'psicofisico', public_id: conductor.psicofisico.public_id },
      { name: 'escuela', public_id: conductor.escuela.public_id }
    ];

    const fileData = await Promise.all(files.map(async file => {
      if (file.public_id) {
        const resource = await cloudinary.api.resource(file.public_id);
        return {
          name: file.name,
          url: resource.secure_url,
          format: resource.format
        };
      }
      return null;
    }));

    const filteredFileData = fileData.filter(file => file !== null);
    res.json(filteredFileData);
  } catch (error) {
    console.error("Error al obtener archivos del conductor:", error);
    res.status(500).json({ message: 'Error al obtener archivos del conductor.' });
  }
};