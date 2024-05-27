import { Router } from "express"
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
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
        //creacion del token
        jwt.sign({
            id:userSaved._id
        },'secret123', {expiresIn:"1d"},(err,token)=>{
            if(err) console.log(err);
            res.json({token});
        })
        // res.json({
        //     id: userSaved._id,
        //     nombreCompleto:userSaved.nombreCompleto,
        //     email:userSaved.email,
        //     password:userSaved.password,
        //     status:userSaved.status
        // })
    } catch (error) {
        console.log(error);
    }
};
export const login = (req, res)=>{}