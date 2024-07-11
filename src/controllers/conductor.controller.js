import Conductor from "../models/conductor.model.js";
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
  uploadAduana,
  deleteFile,
  download
} from "../libs/cloudinary.js";
import fs from "fs-extra";
import asyncHandler from 'express-async-handler';


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
export const updateConductor = asyncHandler(async (req, res) => {
  const conductor = await Conductor.findById(req.params.id);

  if (!conductor) {
    res.status(404);
    throw new Error('Conductor no encontrado');
  }

  conductor.nombre = req.body.nombre || conductor.nombre;
  conductor.fechaNacimiento = req.body.fechaNacimiento || conductor.fechaNacimiento;
  conductor.numLicencia = req.body.numLicencia || conductor.numLicencia;
  conductor.numVisa = req.body.numVisa || conductor.numVisa;
  conductor.numGafete = req.body.numGafete || conductor.numGafete;

  const fileKeys = [
    'solicitud',
    'ine',
    'visa',
    'fast',
    'antidoping',
    'antecedentes',
    'domicilio',
    'psicofisico',
    'aduana'
  ];

  for (const key of fileKeys) {
    if (req.files?.[key]) {
      if (conductor[key]?.public_id) {
        await deleteFile(conductor[key].public_id);
      }
      const uploadedFile = await uploadFile(req.files[key], {
        solicitud: uploadSolicitud,
        ine: uploadIne,
        visa: uploadVisa,
        fast: uploadFast,
        antidoping: uploadAntidoping,
        antecedentes: uploadAntecedentes,
        domicilio: uploadDomicilio,
        psicofisico: uploadPsicofisico,
        aduana: uploadAduana,
      }[key]);
      conductor[key] = {
        public_id: uploadedFile.public_id,
        secure_url: uploadedFile.secure_url
      };
    }
  }

  const updatedConductor = await conductor.save();
  res.json(updatedConductor);
});

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

export const getConductorFiles = async (req, res) => {
  try {
      const conductor = await Conductor.findById(req.params.id);
      if (!conductor) {
          return res.status(404).json({ message: 'Conductor no encontrado.' });
      }

      const files = [
          { name: 'solicitud', path: conductor.solicitud.secure_url },
          { name: 'ine', path: conductor.ine.secure_url },
          { name: 'visa', path: conductor.visa.secure_url },
          { name: 'fast', path: conductor.fast.secure_url },
          { name: 'antidoping', path: conductor.antidoping.secure_url },
          { name: 'antecedentes', path: conductor.antecedentes.secure_url },
          { name: 'domicilio', path: conductor.domicilio.secure_url },
          { name: 'psicofisico', path: conductor.psicofisico.secure_url },
          { name: 'aduana', path: conductor.aduana.secure_url }
      ];
      console.log(files)
      const fileData = await Promise.all(files.map(async file => {
          if (file.path) {
              const url = cloudinary.url(file.path);
              
              return { name: file.name, url };
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