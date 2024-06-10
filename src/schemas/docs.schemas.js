import { z } from 'zod'

export const docSchema = z.object({
    nombre:z.string({
        required_error: "El nombre es requerido",
    }),
    fechaFinal: z.preprocess((arg) => {
        if (typeof arg === 'string' || arg instanceof Date) {
          return new Date(arg);
        }
        return arg;
      }, z.date({
        required_error: "Se requiere la fecha final de la vigencia",
        invalid_type_error: "La fecha final debe ser una fecha válida",
      })),
    foto:z.string({
        required_error: "La foto es requerida",
    }),
    descripcion:z.string({
        required_error: "La descripcion es requerida",
    }),
    avisoAntelacion: z.preprocess((arg) => {
        if (typeof arg === 'string' || arg instanceof Date) {
          return new Date(arg);
        }
        return arg;
      }, z.date({
        required_error: "Se requiere la fecha para notificarle con antelacion",
        invalid_type_error: "La fecha de antelacion debe ser una fecha válida",
      }))
})