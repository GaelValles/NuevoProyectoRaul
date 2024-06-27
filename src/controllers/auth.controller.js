import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import { TOKEN_SECRET  } from "../config.js";
import {createAccessToken} from '../libs/jwt.js'
import fs from 'fs-extra';
import { uploadPerfil } from "../libs/cloudinary.js";

export const registrar = async (req, res) => {
    try {
      const {
        nombreCompleto,
        email,
        telefono,
        password
      } = req.body;

      const passwordHash = await bcrypt.hash(password, 10);

      const newUser = new User({
        nombreCompleto,
        email,
        telefono,
        password:passwordHash
      });

      if (req.files?.perfil) {
        const result = await uploadPerfil(req.files.perfil.tempFilePath)
        newUser.perfil = {
          public_id: result.public_id,
          secure_url: result.secure_url
        }
        await fs.unlink(req.files.perfil.tempFilePath)
      }

      const savedUser = await newUser.save();
      res.json(savedUser);
    } catch (error) {
      return res.status(500).json({
        message: "Error al crear el usuario",
        message: error.message
      });
    }
  };


  export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userFound = await User.findOne({ email });
        if (!userFound) return res.status(400).json({ message: "Datos invalidos" });

        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) return res.status(400).json({ message: "Datos invalidos" });

        const token = await createAccessToken({ id: userFound._id });
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });
        res.json({
            id: userFound._id,
            perfil: userFound.perfil,
            nombreCompleto: userFound.nombreCompleto,
            email: userFound.email,
            token
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const logout = (req,res) =>{
    res.cookie('token', "", {
        expires: new Date(0)
    })
    return res.sendStatus(200)
}
export const perfil = async(req,res) => {
    const userFound = await User.findById(req.user.id)
    
    if( !userFound ) return res.status(400).json({message:"El usuario no existe"});

    return res.json({
        id: userFound._id,

        nombreCompleto:userFound.nombreCompleto,
        email:userFound.email,
        password:userFound.password,

    })
    res.send('profile')
}