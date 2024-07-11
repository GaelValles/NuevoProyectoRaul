import cron from 'node-cron';
import nodemailer from 'nodemailer';
import User from '../models/user.model.js';
import Permiso from '../models/permiso.model.js';

export const enviarEmail = async () => {
  try {
    // Crear transporte de nodemailer
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "alertasycontroldedatos@gmail.com",
        pass: "zjjwvenoooifcpqq", // Asegúrate de que esta contraseña es correcta
      },
    });

    // Verificar conexión y autenticación
    transporter.verify((error, success) => {
      if (error) {
        console.error('Error en la configuración de Nodemailer:', error);
      } else {
        console.log('Servidor de correo listo para enviar mensajes:', success);
      }
    });

    // Función para enviar correos con los permisos de todos los usuarios
    const enviarCorreosConPermisos = async () => {
      const usuarios = await User.find({}, 'email');
      for (const usuario of usuarios) {
        const permisos = await Permiso.find({ user: usuario._id }, 'titulo');
        console.log(`Usuario: ${usuario.email}`);
        
        if (permisos.length > 0) {
          for (const permiso of permisos) {
            const mailOptions = {
              from: '"Alertas y Control de Datos" <alertasycontroldedatos@gmail.com>',
              to: usuario.email,
              subject: 'Información del Permiso',
              text: `Hola, tienes un nuevo permiso titulado: ${permiso.titulo}`,
            };

            try {
              await transporter.sendMail(mailOptions);
              console.log(`Correo enviado a ${usuario.email} con el permiso: ${permiso.titulo}`);
            } catch (error) {
              console.error(`Error al enviar correo a ${usuario.email}:`, error);
            }
          }
        } else {
          console.log('Permisos: Ninguno');
        }
      }
    };

    // Programar la tarea cron
    cron.schedule('0 * * * *', async () => { // Cambiado a cada hora
      console.log("Ejecutando cron");
      await enviarCorreosConPermisos();
    });

  } catch (error) {
    console.error("Error en enviarEmail:", error);
  }
};
