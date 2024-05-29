
import mongoose from "mongoose";

const docSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    fechaCreacion: {
        type: Date,
        default: Date.now,
    },
    fechaFinal: {
        type: Date,
    },
    foto: {
        type: String, // URL de la foto almacenada
        required: true
    },
    observaciones: {
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

export default mongoose.model('docSchema', docSchema);
