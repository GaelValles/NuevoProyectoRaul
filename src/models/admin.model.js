import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    correo: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        default: 'admin'
    }
}, {
    timestamps: true
});

export default mongoose.model('Admin', adminSchema);