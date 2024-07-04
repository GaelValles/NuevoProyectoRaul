// services/emailService.js
import nodemailer from 'nodemailer';

export const enviarEmail = async (email, asunto, contenido) => {
    const config = {
        service: 'gmail',
        auth: {
            user: 'alertasycontroldedatos@gmail.com',
            pass: 'zjjw veno ooif cpqq'
        }
    };

    const mensaje = {
        from: 'alertasycontroldedatos@gmail.com',
        to: email,
        subject: asunto,
        text: contenido
    };

    const transport = nodemailer.createTransport(config);

    try {
        await transport.sendMail(mensaje);
        console.log(`Correo enviado a ${email}`);
    } catch (error) {
        console.error('Error al enviar el correo:', error);
    }
};
