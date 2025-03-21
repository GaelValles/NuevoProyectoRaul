import mongoose from "mongoose";

const asistenciaSchema = new mongoose.Schema({
    materia: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Materia',
        required: true
    },
    alumno: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Alumno',
        required: true
    },
    fecha: {
        type: Date,
        required: true,
        default: Date.now
    },
    estado: {
        type: String,
        enum: ['presente', 'ausente'],
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model('Asistencia', asistenciaSchema);