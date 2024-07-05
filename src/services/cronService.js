// services/cronService.js
import cron from "node-cron";
import Permiso from "../models/permiso.model.js";
import { enviarEmail } from "./emailService.js";

const checkPermisos = async () => {
    try {
        const permisos = await Permiso.find().populate('user');
        const today = new Date();
        console.log('Verificando permisos...', today);
        
        permisos.forEach(permiso => {
            const avisoDate = new Date(permiso.fechaFinal);
            avisoDate.setDate(avisoDate.getDate() - permiso.avisoAntelacion);

            console.log(`Permiso ID: ${permiso._id} - Fecha Final: ${permiso.fechaFinal} - Aviso Antelacion: ${permiso.avisoAntelacion} - Aviso Date: ${avisoDate}`);

            if (today >= avisoDate && today <= permiso.fechaFinal) {
                const emailContent = `El permiso con ID: ${permiso._id} se vencerá pronto.`;
                enviarEmail(permiso.userEmail, 'Aviso de vencimiento de permiso', emailContent)
                    .then(() => console.log(`Correo enviado a ${permiso.userEmail}`))
                    .catch(error => console.error('Error al enviar el correo:', error));
            }
        });
    } catch (error) {
        console.error('Error al verificar permisos:', error);
    }
};

// Ejecutar la verificación cada día a medianoche
cron.schedule("0 0 * * *", checkPermisos);
