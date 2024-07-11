import cron from 'node-cron';
import nodemailer from 'nodemailer';
import User from '../models/user.model.js';
import Permiso from '../models/permiso.model.js';
import Camion from '../models/camion.model.js';

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
      try {
        const usuarios = await User.find({}, 'email');
        for (const usuario of usuarios) {
          const permisos = await Permiso.find({ user: usuario._id }, 'titulo fechaFinal descripcion avisoAntelacion status');
          console.log(`Usuario: ${usuario.email}`);
          
          if (permisos.length > 0) {
            const fechaActual = new Date();
            for (const permiso of permisos) {
              const { titulo, fechaFinal, descripcion, avisoAntelacion } = permiso;
              if (fechaActual >= new Date(avisoAntelacion) && fechaActual <= new Date(fechaFinal)) {
                const mailOptions = {
                  from: '"Alertas y Control de Datos" <alertasycontroldedatos@gmail.com>',
                  to: usuario.email,
                  subject: `Actualizar ${titulo}`,
                  text: `Hola, tienes un nuevo permiso titulado: ${titulo}\nDescripción: ${descripcion}`,
                };

                try {
                  await transporter.sendMail(mailOptions);
                  console.log(`Correo enviado a ${usuario.email} con el permiso: ${titulo}`);
                } catch (error) {
                  console.error(`Error al enviar correo a ${usuario.email}:`, error);
                }
              } else {
                console.log(`Permiso ${titulo} de ${usuario.email} no está dentro del rango de fechas para envío.`);
              }
            }
          } else {
            console.log('Permisos: Ninguno');
          }
        }
      } catch (error) {
        console.error('Error al obtener usuarios o permisos:', error);
      }
    };

    // Función para enviar correos de mantenimiento de camiones
    const enviarCorreosMantenimientoCamiones = async () => {
      try {
        const usuarios = await User.find({}, 'email');
        for (const usuario of usuarios) {
          const camiones = await Camion.find({ user: usuario._id }, 'marca modelo color mantenimiento placasMx placasUsa');
          console.log(`Camiones de ${usuario.email}:`, camiones); // Mostrar los camiones por consola

          if (camiones.length > 0) {
            const fechaActual = new Date();
            for (const camion of camiones) {
              const { marca, modelo, color, mantenimiento, placasMx, placasUsa } = camion;
              const fechaMantenimiento = new Date(mantenimiento);
              if (fechaActual >= fechaMantenimiento) {
                let tipoMantenimiento = '';
                let frecuencia = '';

                // Asegúrate de tener cron.expression definido y válido aquí
                const cronExpression = '0 9 1 */3 *'; // Reemplaza con la expresión cron adecuada

                if (cronExpression === '0 9 1 */3 *') {
                  tipoMantenimiento = 'preventivo';
                  frecuencia = 'trimestral';
                } else if (cronExpression === '0 9 1 1 *') {
                  tipoMantenimiento = 'anual';
                  frecuencia = 'anual';
                }

                if (tipoMantenimiento && frecuencia) {
                  const mailMantenimiento = {
                    from: '"Alertas y Control de Datos" <alertasycontroldedatos@gmail.com>',
                    to: usuario.email,
                    subject: `Mantenimiento ${tipoMantenimiento} ${marca} ${modelo} ${color}`,
                    text: `Hola, se acerca tu mantenimiento ${frecuencia} del camión ${marca} ${modelo} ${color}\n
                    Más descripción del camión:\n
                    Placas MX: ${placasMx}.\n
                    Placas USA: ${placasUsa}
                    `,
                  };
                  try {
                    await transporter.sendMail(mailMantenimiento);
                    console.log(`Correo enviado a ${usuario.email} del camión ${marca} ${modelo} ${color}`);
                  } catch (error) {
                    console.error(`Error al enviar correo a ${usuario.email}:`, error);
                  }
                }
              } else {
                console.log(`El camión ${marca} ${modelo} ${color} no necesita mantenimiento en este momento.`);
              }
            }
          } else {
            console.log('Camiones: Ninguno');
          }
        }
      } catch (error) {
        console.error('Error al obtener usuarios o camiones:', error);
      }
    };

    // Programar la tarea cron para permisos 
    cron.schedule('0 9 */4 * *', async () => { // se ejecuta cada 4 días a las 9:00am
      console.log("Ejecutando cron de permisos");
      await enviarCorreosConPermisos();
    });

    // Programar la tarea cron para mantenimiento de camiones trimestral
    cron.schedule('0 9 1 */3 *', async () => { // se ejecuta cada 3 meses el día 1 a las 9:00am
      console.log("Ejecutando cron de mantenimiento trimestral");
      await enviarCorreosMantenimientoCamiones();
    });

    // Programar la tarea cron para mantenimiento de camiones anual
    cron.schedule('0 9 1 1 *', async () => { // se ejecuta el 1 de enero a las 9:00am
      console.log("Ejecutando cron de mantenimiento anual");
      await enviarCorreosMantenimientoCamiones();
    });

  } catch (error) {
    console.error("Error en enviarEmail:", error);
  }
};
