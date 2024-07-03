import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    nombreCompleto:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    telefono:{
        type:String,
        trim: true,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    },
    perfil: {
        public_id: String,
        secure_url: String,
    },

})
const User = mongoose.model('User', userSchema)
export default User
