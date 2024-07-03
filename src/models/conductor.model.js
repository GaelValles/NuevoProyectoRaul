import mongoose from "mongoose";

const conductorSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        fechaNacimiento: {
            type: Date,
            required: true,
        },
        numLicencia: {
            type: String,
            required: true,
            trim: true,
        },
        numVisa: {
            type: String,
            required: true,
            trim: true,
        },
        numGafete: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        solicitud: {
            public_id: String,
            secure_url: String,
        },
        ine: {
            public_id: String,
            secure_url: String,
        },
        visa: {
            public_id: String,
            secure_url: String,
        },
        fast: {
            public_id: String,
            secure_url: String,
        },
        antidoping: {
            public_id: String,
            secure_url: String,
        },
        antecedentes: {
            public_id: String,
            secure_url: String,
        },
        domicilio: {
            public_id: String,
            secure_url: String,
        },
        psicofisico: {
            public_id: String,
            secure_url: String,
        },
        aduana: {
            public_id: String,
            secure_url: String,
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        }
    },
    {
        timestamps: true,
    },
);

const Conductor = mongoose.model("Conductor", conductorSchema);
export default Conductor;
