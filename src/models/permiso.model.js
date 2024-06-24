
import mongoose from "mongoose";

const docSchema = new mongoose.Schema({
    titulo: {
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
    descripcion: {
        type: String,
        required: true,
    },
    fechaAnticipacion: {
        type: Date,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    }
},
{
    timestamps:true
}
);
const Doc = mongoose.model('Doc', docSchema)
export default Doc
