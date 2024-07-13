

import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import { TOKEN_SECRET  } from "../config.js";
import {createAccessToken} from '../libs/jwt.js'
import fs from 'fs-extra';
import { uploadPerfil, deleteFile } from "../libs/cloudinary.js";

export const registrar = async (req, res) => {
  const { nombreCompleto, email, telefono, password } = req.body;
  try {
    const userFound = await User.findOne();
    if (!userFound)
      return res.status(400).json({ message: ["Esta cuenta ya existe"]});
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      nombreCompleto,
      email,
      telefono,
      password:passwordHash,
    });

    if (req.files?.perfil) {
      const result = await uploadPerfil(req.files.perfil.tempFilePath)
      newUser.perfil = {
        public_id: result.public_id,
        secure_url: result.secure_url
      }
        await fs.unlink(req.files.perfil.tempFilePath)
    }
  
    const userSaved = await newUser.save();

    const token = await createAccessToken({id:userSaved._id});
    res.cookie('token', token);
    res.json({
      id: userSaved._id,
      nombreCompleto: userSaved.nombreCompleto,
      email: userSaved.email,
      telefono: userSaved.telefono
    });
  } catch (error) {
      return res.status(500).json({
        message: "Error al crear el usuario",
        message: error.message
      });
    }
  };


//Obtener solo un usuario por id
export const getUsuario = async (req, res) => {
  try {
    const usuario = await User.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(usuario);
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener el usuario",
      error,
    });
  }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userFound = await User.findOne({ email });
        if (!userFound) return res.status(400).json({ message: "Datos invalidos email" });

        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) return res.status(400).json({ message: "Datos invalidos" });

        const token = await createAccessToken({ id: userFound._id, email: userFound.email });
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'none' });
        
        res.json({
            id: userFound._id,
            perfil: userFound.perfil,
            nombreCompleto: userFound.nombreCompleto,
            email: userFound.email,
            telefono: userFound.telefono
             
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const logout = (req,res) =>{
    res.cookie('token', "", {
        expires: new Date(0),
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    })
    return res.sendStatus(200)
}

export const perfil = async(req,res) => {
  const userFound = await User.findById(req.user.id);

  if(!userFound) return res.status(400).json({message: "usuario no encontrado"});
  
  return res.json({
    id:userFound._id,
    nombreCompleto:userFound.nombreCompleto,
    email:userFound.email,
    telefono:userFound.telefono,
    perfil:userFound.perfil,
  })

}

export const updateUsuario = async (req, res, next) => {
  try {
    const usuarioActual = await User.findById(req.params.id);

    if (!usuarioActual) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const { nombreCompleto, email, telefono, perfil } = req.body;
    const data = {
      nombreCompleto,
      email,
      telefono,
      perfil
    };

    console.log("Este es el usuario original", usuarioActual);
    console.log("Datos recibidos:", data);

    if (req.files && req.files.perfil) {
      const imgId = usuarioActual.perfil?.public_id;
      if (imgId) {
        await deleteFile(imgId);
      }

      const newImage = await uploadPerfil(req.files.perfil.tempFilePath);
      data.perfil = {
        public_id: newImage.public_id,
        secure_url: newImage.secure_url
      };

      await fs.unlink(req.files.perfil.tempFilePath); // Eliminar el archivo temporal
    }

    console.log("Datos que se van a actualizar:", data);

    const usuarioUpdated = await User.findByIdAndUpdate(req.params.id, data, { new: true });

    return res.status(200).json(usuarioUpdated);

  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    res.status(500).json({
      message: "Error al actualizar el usuario",
      error,
    });
    next(error);
  }
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.send(false);

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.sendStatus(401);

    const userFound = await User.findById(user.id);
    if (!userFound) return res.sendStatus(401);

    return res.json({
      id:userFound._id,
      nombreCompleto:userFound.nombreCompleto,
      email:userFound.email,
      telefono:userFound.telefono,
      perfil:userFound.perfil,
    });
  });
};