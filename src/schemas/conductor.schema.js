import { z } from 'zod';

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
  solicitud: z.string({
    required_error: "Se requiere subir la solicitud",
  }),
  antidoping: z.string({
    required_error: "Se requiere subir el antidoping",
  }),
  antecedentes: z.string({
    required_error: "Se requiere subir los antecedentes penales",
  }),
  ine: z.string({
    required_error: "Se requiere subir el INE",
  }),
  visa: z.string({
    required_error: "Se requiere subir la visa",
  }),
  fast: z.string({
    required_error: "Se requiere subir el fast express",
  }),
  domicilio: z.string({
    required_error: "Se requiere subir el comprobante de domicilio",
  }),
  psicofisico: z.string({
    required_error: "Se requiere subir la prueba psicofisica",
  }),
  aduana: z.string({
    required_error: "Se requiere subir la licencia de aduana",
  }),
});
