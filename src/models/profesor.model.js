import mongoose from "mongoose";

const profesorSchema = new mongoose.Schema({
    nombre_completo: {
        type: String,
        required: true,
        trim: true
    },
    telefono: {
        type: Date,
        required: true
    },
    correo: {
        type: String,
        required: true,
        trim: true
        
    },
    cv: {
        type: String,
        public_id: String,
        secure_url: String,
    },
    foto_perfil: {
        public_id: String,
        secure_url: String,
    },
    password: {
        type: String,
        required: true,
    },
},
{
    timestamps:true
}
);
const Profesor = mongoose.model('Profesor', profesorSchema)
export default Profesor
