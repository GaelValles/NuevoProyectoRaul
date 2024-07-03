import mongoose from 'mongoose'

const cajaSchema = new mongoose.Schema({
    placas:{
        type:String,
        required: true
    },
    numEco:{
        type:String,
        required: true
    },
    marca:{
        type:String,
        required: true
    },
    anio: {
        type:Number,
        required: true
    },
    numSerie:{
        type:String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
      },
  
    

})
const Caja = mongoose.model('Caja', cajaSchema)
export default Caja
