import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dftu2fjzj",
  api_key: "946929268796721",
  api_secret: "mQ0AiZEdxcmd7RLyhOB2KclWHQA",
  secured: true,
});
//Conductores
    //Subir archivos
    export async function uploadSolicitud(filePath) {
    return await cloudinary.uploader.upload(filePath, {
        folder: "lugaSolicitud",
    });
    }

    export async function uploadIne(filePath) {
    return await cloudinary.uploader.upload(filePath, { folder: "lugaIne" });
    }

    export async function uploadVisa(filePath) {
    return await cloudinary.uploader.upload(filePath, { folder: "lugaVisa" });
    }

    export async function uploadFast(filePath) {
    return await cloudinary.uploader.upload(filePath, { folder: "lugaFast" });
    }

    export async function uploadAntidoping(filePath) {
    return await cloudinary.uploader.upload(filePath, {
        folder: "lugaAntidoping",
    });
    }

    export async function uplaodAntecedentes(filePath) {
    return await cloudinary.uploader.upload(filePath, {
        folder: "lugaAntecedentes",
    });
    }
    export async function uploadDomicilio(filePath) {
    return await cloudinary.uploader.upload(filePath, {
        folder: "lugaDomicilio",
    });
    }
    export async function uploadPsicofisico(filePath) {
    return await cloudinary.uploader.upload(filePath, {
        folder: "lugaPsicofisico",
    });
    }

    export async function uploadAduana(filePath) {
    return await cloudinary.uploader.upload(filePath, { folder: "lugaAduana" });
    }

    //Eliminar archivos
    export async function deleteFile(public_id) {
    return await cloudinary.uploader.destroy(public_id);
    }

//Permisos
    //Subir archivos
    export async function uploadFoto(filePath) {
        return await cloudinary.uploader.upload(filePath, {
            folder: "LugaFotoPermiso",
        });
        }