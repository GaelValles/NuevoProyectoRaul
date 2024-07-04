import { z } from 'zod'

export const loginSchema = z.object({
    email:z.string({
        required_error: "El correo es requerido",
    }).email({
        message:"Correo invalido"
    }),
    password:z.string({
        required_error: "La contraseña es requerida",
    }).min (8,{
        message:"La contraseña debe contener al menos 8 digitos"
    })
})