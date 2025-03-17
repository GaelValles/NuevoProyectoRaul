import mongoose from 'mongoose'

const materiaSchema = new mongoose.Schema({
    nombre:{
        type:String,
        required: true
    },
    grado:{
        type:Number,
        required: true
    },
    grupo: {
        type: String,
        required: true
    },
    profesor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profesor",
        required:true
      },

})
const Materia = mongoose.model('Materia', materiaSchema)
export default Materia
