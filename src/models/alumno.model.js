import mongoose from "mongoose";

const alumnoSchema = new mongoose.Schema(
    {
        nombreCompleto: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        matricula: {
            type: Date,
            required: true,
        },
        carrera: {
            type: String,
            required: true,
            trim: true,
        },
        grado: {
            type: String,
            required: true,
            trim: true,
        },
        grupo: {
            type: String,
            required: true,
            trim: true,
        },
        correo: {
            type: String,
            required: true,
            trim: true,
        },
        telefono: {
            type: String,
            required: true,
            trim: true,
        },
        perfil: {
            public_id: String,
            secure_url: String,
        },
        password:{
            type:String,
            required: true
        },
        // solicitud: {
        //     public_id: String,
        //     secure_url: String,
        // },
    },
    {
        timestamps: true,
    },
);

const Alumno = mongoose.model("Alumno", alumnoSchema);
export default Alumno;
