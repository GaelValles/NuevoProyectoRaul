import { z } from 'zod'

export const docSchema = z.object({
    nombre_completo:z.string({
        required_error: "El nombre es requerido",
    }),
    telefono: z.preprocess((arg) => {
        if (typeof arg === 'string' || arg instanceof Date) {
          return new Date(arg);
        }
        return arg;
      }, z.date({
        required_error: "Se requiere la fecha final de la vigencia",
        invalid_type_error: "La fecha final debe ser una fecha válida",
      })),
    correo:z.string({
        required_error: "La foto es requerida",
    }),
    carrera:z.string({
        required_error: "La descripcion es requerida",
    }),
    grado:z.string({
      required_error: "La descripcion es requerida",
  }),
  grupo:z.string({
    required_error: "La descripcion es requerida",
}),

foto_perfil: fileValidation,

})