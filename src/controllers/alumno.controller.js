import Alumno from "../models/alumno.model.js";
import JSZip from "jszip";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";

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
export const getAlumnos = async (req, res) => {
  try {
      const alumnos = await Alumno.find({user:req.user.id}).populate('user');
      res.json(alumnos);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

// Crear un alumno
export const postAlumnos = async (req, res) => {
    const { nombreCompleto, matricula, carrera, grado, grupo, correo, telefono, perfil, password } = req.body;
  try {
    const newAlumno = new Alumno({ nombreCompleto, matricula, carrera, grado, grupo, correo, telefono, perfil, password, user: req.user.id });

    const fileUploads = {
      perfil: uploadPerfil,
    };

    for (const [key, uploadFunction] of Object.entries(fileUploads)) {
      if (req.files?.[key]) {
        newAlumno[key] = await uploadFile(req.files[key], uploadFunction);
      }
    }

    const savedAlumno = await newAlumno.save();
    res.json(savedAlumno);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Obtener un alumno por id
export const getAlumno = async (req, res) => {
  try {
    const alumno = await Alumno.findById(req.params.id);
    if (!alumno) {
      return res.status(404).json({ message: "Alumno no encontrado" });
    }
    res.json(alumno);
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener el alumno",
      error,
    });
  }
};

// Actualizar un alumno por id
export const updateAlumno = async (req, res, next) => {
  try {
      const alumnoActual = await Alumno.findById(req.params.id);

      if (!alumnoActual) {
          return res.status(404).json({ message: 'Alumno no encontrado' });
      }

      const { nombreCompleto, matricula , carrera, grado, grupo, correo, telefono, perfil, password } = req.body;
      const data = {
          nombreCompleto,
          matricula,
          carrera,
          grado,
          grupo,
          correo,
          telefono,
          perfil,
          password,
      };
      console.log("Esto llega",data)
      
      const fileUploads = {
          perfil: uploadPerfil,
      };

      for (const [key, uploadFunction] of Object.entries(fileUploads)) {
          if (req.files && req.files[key]) {
              const imgId = alumnoActual[key]?.public_id;
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

      const alumnoUpdated = await Alumno.findByIdAndUpdate(req.params.id, data, { new: true });

      return res.status(200).json(alumnoUpdated);

  } catch (error) {
      console.error("Error al actualizar el alumno:", error);
      res.status(500).json({
          message: "Error al actualizar el alumno",
          error,
      });
      next(error);
  }
};
// Eliminar un alumno por id
export const deleteAlumno = async (req, res) => {
  try {
    const alumno = await Alumno.findByIdAndDelete(req.params.id);

    if (!alumno) {
      return res.status(404).json({ message: "Alumno no encontrado" });
    }

    const fileFields = [
      "perfil",
    ];

    for (const field of fileFields) {
      if (alumno[field]) {
        await deleteFile(alumno[field].public_id);
      }
    }

    return res.json(alumno);
  } catch (error) {
    return res.status(500).json({
      message: "Error al eliminar el alumno",
      error,
    });
  }
};
