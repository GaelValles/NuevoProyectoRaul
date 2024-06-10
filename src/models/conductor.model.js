
import mongoose from "mongoose";

const conductorSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    fechaNacimiento: {
        type: Date,
        required:true,
    },
    numLicencia: {
        type: String,
        required: true,
    },
    numVisa: {
        type: String,
        required: true,
    },
    numGafete: {
        type: String,
        required: true,
    },
    solicitud: {
        type: String, // URL de la foto almacenada
        required: true
    },
    ine: {
        type: String, // URL de la foto almacenada
        required: true
    },
    visa: {
        type: String, // URL de la foto almacenada
        required: true
    },
    fast: {
        type: String, // URL de la foto almacenada
        required: true
    },
    antidoping: {
        type: String, // URL de la foto almacenada
        required: true
    },
    antecedentes: {
        type: String, // URL de la foto almacenada
        required: true
    },
    domicilio: {
        type: String, // URL de la foto almacenada
        required: true
    },
    psicofisico: {
        type: String, // URL de la foto almacenada
        required: true
    },
    aduana: {
        type: String, // URL de la foto almacenada
        required: true
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

const Conductor = mongoose.model('Conductor', conductorSchema)
export default Conductor
