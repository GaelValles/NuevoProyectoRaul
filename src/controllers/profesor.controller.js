import Profesor from "../models/profesor.model.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs-extra";

cloudinary.config({
  cloud_name: "dftu2fjzj",
  api_key: "946929268796721",
  api_secret: "mQ0AiZEdxcmd7RLyhOB2KclWHQA",
  secured: true,
});
const uploadFile = async (file, uploadFunction) => {
  const result = await uploadFunction(file.tempFilePath);
  await fs.unlink(file.tempFilePath);
  return {
    public_id: result.public_id,
    secure_url: result.secure_url,
  };
};

export const loginProfesor = async (req, res) => {
    const { correo, password } = req.body;
    try {
        const userFound = await User.findOne({ correo });
        if (!userFound) return res.status(400).json({ message: "Datos invalidos correo" });

        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) return res.status(400).json({ message: "Datos invalidos" });

        const token = await createAccessToken({ id: userFound._id, correo: userFound.correo });
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'none' });
        
        res.json({
            id: userFound._id,
            foto_perfil: userFound.foto_perfil,
            nombre_completo: userFound.nombre_completo,
            correo: userFound.correo,
            telefono: userFound.telefono
             
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//Obtener todos los profesores
export const getProfesores = async (req, res) => {
    try {
      const profesores = await Profesor.find({user:req.user.id}).populate('user');
      res.json(profesores);
    } catch (error) {
      return res.status(500).json({
        message: "Error al obtener los profesores",
        error,
      });
    }
  };
  
  export const getCVFile = async (req, res) => {
    try {
      const profesor = await Profesor.findById(req.params.id);
      if (!profesor) {
        return res.status(404).json({ message: 'Profesor no encontrado.' });
      }
  
      if (!profesor.foto || !profesor.foto.public_id) {
        return res.status(404).json({ message: 'Archivo no encontrado.' });
      }
  
      const resource = await cloudinary.api.resource(profesor.foto.public_id);
      const fileData = {
        name: profesor.titulo,
        url: resource.secure_url,
        format: resource.format
      };
  
      res.json(fileData);
    } catch (error) {
      console.error("Error al obtener archivo del profesor:", error);
      res.status(500).json({ message: 'Error al obtener archivo del profesor.' });
    }
  };

//Crear un profesor
export const postProfesor = async (req, res) => {
      const { nombre_completo, telefono, correo, cv, foto_perfil, password } = req.body;  
  try {
    console.log(req)
      const newProfesor = new Profesor({ nombre_completo, telefono, correo, cv, foto_perfil, password, user: req.user.id });

      const fileUploads = {
        perfil: uploadPerfil,
      };
  
      for (const [key, uploadFunction] of Object.entries(fileUploads)) {
        if (req.files?.[key]) {
          newAlumno[key] = await uploadFile(req.files[key], uploadFunction);
        }
      }
    } catch (error) {
      return res.status(500).json({
        message: "Error al crear el profesor",
        error,
      });
    }
};
  
//Obtener solo un profesor por id
export const GetProfesor = async (req, res) => {
    try {
      const profesor = await Profesor.findById(req.params.id);
      if (!profesor) {
        return res.status(404).json({ message: "Profesor no encontrado" });
      }
      res.json(profesor);
    } catch (error) {
      return res.status(500).json({
        message: "Error al obtener el profesor",
        error,
      });
    }
};

export const updateProfesor = async (req, res, next) => {
  try {
    const profesorActual = await Profesor.findById(req.params.id);

    if (!profesorActual) {
      return res.status(404).json({ message: 'Profesor no encontrado' });
    }

    const { titulo, fechaFinal, descripcion, avisoAntelacion } = req.body;
    const data = {
      titulo,
      fechaFinal,
      descripcion,
      avisoAntelacion,
    };

    console.log("Este es el profesor original", profesorActual);
    console.log("Datos recibidos:", data);

    if (req.files && req.files.foto) {
      const imgId = profesorActual.foto?.public_id;
      if (imgId) {
        await deleteFile(imgId);
      }

      const newImage = await uploadFoto(req.files.foto.tempFilePath);
      data.foto = {
        public_id: newImage.public_id,
        secure_url: newImage.secure_url
      };

      await fs.unlink(req.files.foto.tempFilePath); // Eliminar el archivo temporal
    }

    console.log("Datos que se van a actualizar:", data);

    const permisoUpdated = await Profesor.findByIdAndUpdate(req.params.id, data, { new: true });

    return res.status(200).json(permisoUpdated);

  } catch (error) {
    console.error("Error al actualizar el profesor:", error);
    res.status(500).json({
      message: "Error al actualizar el profesor",
      error,
    });
    next(error);
  }
};

  //Eliminar un profesor por id
  export const deleteProfesor = async (req, res) => {
    try {
      const profesor = await Profesor.findByIdAndDelete(req.params.id);
  
      if (!profesor)
        return res.status(404).json({ message: "Profesor no encontrado" });
      return res.sendStatus(204);
    } catch (error) {
      return res.status(500).json({
        message: "Error al eliminar el documento",
        error,
      });
    }
  };
  
//Cambiar status en el profesor
export const cambioStatus = async (req, res) => {
  try {
      const { id } = req.params;
      const { status } = req.body;
      const profesor = await Profesor.findByIdAndUpdate(id, {
          status: status,
      }, { new: true });

      if (!profesor) {
          return res.status(404).json({ message: "Profesor no encontrado" });
      }

      res.status(200).json({ message: "Cambio de status", profesor });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al realizar el cambio de status" });
  }
};