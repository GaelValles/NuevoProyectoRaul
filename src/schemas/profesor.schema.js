import { z } from 'zod';

// Función para validar archivos (puedes personalizarla según tus necesidades)
const fileValidation = z.object({
  originalname: z.string(),
  mimetype: z.string(),
  size: z.number(),
  buffer: z.instanceof(Buffer), // Si estás usando buffer para manejar archivos
});

export const registerProfesorSchema = z.object({
  nombre_completo: z.string({
    required_error: "Se requiere el nombre",
  }),
  telefono: z.preprocess((arg) => {
    if (typeof arg === 'string' || arg instanceof Date) {
      return new Date(arg);
    }
    return arg;
  }, z.date({
    required_error: "Se requiere el telefono",
    invalid_type_error: "el telefono debe ser un dato valido",
  })),
  correo: z.string({
    required_error: "Se requiere el correo",
  }),
  cv: fileValidation,
  foto_perfil: fileValidation,
  password:z.string({
    required_error: "La contraseña es requerida",
}).min (8,{
    message:"La contraseña debe contener al menos 8 digitos"
})


});
