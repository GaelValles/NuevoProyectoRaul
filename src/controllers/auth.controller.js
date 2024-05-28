import { Router } from "express"
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import {createAccessToken} from '../libs/jwt.js'
export const registrar = async (req,res)=>{
    const {nombreCompleto, email, telefono, password, status} = req.body

    try {
        //encriptacion de contraseña
        const passwordHash = await bcrypt.hash(password, 10)
        //creacion de objeto para el usuario
        const newUser = new User({
            nombreCompleto,
            email,
            telefono,
            password:passwordHash,
            status
        });
        const userSaved = await newUser.save()
        const token = await createAccessToken({id:userSaved._id})
        res.cookie('token', token);
        res.json({
            id: userSaved._id,
            nombreCompleto:userSaved.nombreCompleto,
            email:userSaved.email,
            password:userSaved.password,
            status:userSaved.status
        })
    } catch (error) {
        res.status(500).json({message:error.message})
    }
};
export const login = (req, res)=>{}