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
export const login = async (req,res)=>{
    const {email, password} = req.body
    try {
        const userFound = await User.findOne({email})
        if (!userFound) return res.status(400).json({message:"Datos invalidos"});

        const isMatch = await bcrypt.compare(password, userFound.password)
        
        if (!isMatch) return res.status(400).json({message:"Datos invalidos"})

        const token = await createAccessToken({id:userFound._id})
        res.cookie('token', token);
        res.json({
            id: userFound._id,
            nombreCompleto:userFound.nombreCompleto,
            email:userFound.email,
            password:userFound.password,
            status:userFound.status
        })
    } catch (error) {
        res.status(500).json({message:error.message})
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
        status:userFound.status
    })
    res.send('profile')
}