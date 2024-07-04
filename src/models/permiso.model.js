import mongoose from "mongoose";

const permisoSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    fechaFinal: {
        type: Date,
        required: true
    },
    foto: {
        public_id: String,
        secure_url: String,
        
    },
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    avisoAntelacion: {
        type: Date,
        required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    userEmail: {
        type: mongoose.Schema.Types.String,
        ref:'User',
        required: true
    },
},
{
    timestamps:true
}
);
const Permiso = mongoose.model('Permiso', permisoSchema)
export default Permiso
