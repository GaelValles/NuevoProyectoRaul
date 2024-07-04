import Permiso from "../models/permiso.model.js";

import fs from "fs-extra";
import { uploadFoto } from "../libs/cloudinary.js";
//Obtener todos los permisos
export const getPermisos = async (req, res) => {
    try {
      const permisos = await Permiso.find({user:req.user.id}).populate('user');
      res.json(permisos);
    } catch (error) {
      return res.status(500).json({
        message: "Error al obtener los permisos",
        error,
      });
    }
  };

//Crear un permiso
export const postPermiso = async (req, res) => {
      const { titulo, fechaFinal, descripcion, avisoAntelacion } = req.body;  
  try {
    console.log(req)
      const newPermiso = new Permiso({ titulo, fechaFinal, descripcion, avisoAntelacion, status: true, user: req.user.id, userEmail: req.user.email  });

      if (req.files?.foto) {
        const result = await uploadFoto(req.files.foto.tempFilePath)
        newPermiso.foto = {
          public_id: result.public_id,
          secure_url: result.secure_url
        }
        await fs.unlink(req.files.foto.tempFilePath)
      }

      const savedPermiso = await newPermiso.save();
      res.json(savedPermiso);
      console.log(savedPermiso);
      console.log(savedPermiso)
    } catch (error) {
      return res.status(500).json({
        message: "Error al crear el permiso",
        error,
      });
    }
};
  
//Obtener solo un permiso por id
export const getPermiso = async (req, res) => {
    try {
      const permiso = await Permiso.findById(req.params.id);
      if (!permiso) {
        return res.status(404).json({ message: "Permiso no encontrado" });
      }
      res.json(permiso);
    } catch (error) {
      return res.status(500).json({
        message: "Error al obtener el permiso",
        error,
      });
    }
};

//actualizar un permiso por id
export const updatePermiso = async (req, res) => {
    try {
      const permiso = await Permiso.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
  
      if (!permiso)
        return res.status(404).json({ message: "Permiso no encontrado" });
      res.json(permiso);
    } catch (error) {
      return res.status(500).json({
        message: "Error al actualizar el permiso",
        error,
      });
    }
};
  
  //Eliminar un permiso por id
  export const deletePermiso = async (req, res) => {
    try {
      const permiso = await Permiso.findByIdAndDelete(req.params.id);
  
      if (!permiso)
        return res.status(404).json({ message: "Permiso no encontrado" });
      return res.sendStatus(204);
    } catch (error) {
      return res.status(500).json({
        message: "Error al eliminar el documento",
        error,
      });
    }
  };
  
//Cambiar status en el permiso
export const cambioStatus = async (req, res) => {
  try {
      const { id } = req.params;
      const { status } = req.body;
      const permiso = await Permiso.findByIdAndUpdate(id, {
          status: status,
      }, { new: true });

      if (!permiso) {
          return res.status(404).json({ message: "Permiso no encontrado" });
      }

      res.status(200).json({ message: "Cambio de status", permiso });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al realizar el cambio de status" });
  }
};