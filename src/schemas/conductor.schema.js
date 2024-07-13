import { z } from 'zod';

// Función para validar archivos (puedes personalizarla según tus necesidades)
const fileValidation = z.object({
  originalname: z.string(),
  mimetype: z.string(),
  size: z.number(),
  buffer: z.instanceof(Buffer), // Si estás usando buffer para manejar archivos
});

export const registerSchema = z.object({
  nombre: z.string({
    required_error: "Se requiere el nombre",
  }),
  fechaNacimiento: z.preprocess((arg) => {
    if (typeof arg === 'string' || arg instanceof Date) {
      return new Date(arg);
    }
    return arg;
  }, z.date({
    required_error: "Se requiere la fecha de nacimiento",
    invalid_type_error: "La fecha de nacimiento debe ser una fecha válida",
  })),
  numLicencia: z.string({
    required_error: "Se requiere el numero de licencia",
  }),
  numVisa: z.string({
    required_error: "Se requiere el numero de visa",
  }),
  numGafete: z.string({
    required_error: "Se requiere el numero de gafete",
  }),
  solicitud: fileValidation,
  antidoping: fileValidation,
  antecedentes: fileValidation,
  ine: fileValidation,
  visa: fileValidation,
  fast: fileValidation,
  domicilio: fileValidation,
  psicofisico: fileValidation,
  escuela: fileValidation,
});
