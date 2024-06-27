
import mongoose from "mongoose";

const permisoSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
    },
    fechaFinal: {
        type: Date,
    },
    foto: {
        public_id: String,
        secure_url: String
    },
    descripcion: {
        type: String,
        required: true,
    },
    avisoAntelacion: {
        type: Date,
        required:true
    },
},
{
    timestamps:true
}
);
const Permiso = mongoose.model('Permiso', permisoSchema)
export default Permiso
