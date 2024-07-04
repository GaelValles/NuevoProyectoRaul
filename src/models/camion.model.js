
import mongoose from 'mongoose'

const camionSchema = new mongoose.Schema({
    marca:{
        type: String,
        required: true,
        trim: true
    },
    modelo:{
        type: String,
        trim: true,
        required: true,
    },
    color:{
        type:String,
        required: true,
    },
    placasMx:{
        type:String,
        required: true
    },
    placasUsa: {
        type:String,
        required: true
    },
    numEco:{
        type:String,
        required: true
    },
    numSerie:{
        type:String,
        required: true
    },
    mantenimiento:{
        type: Date,
        required:true 
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},
{
    timestamps:true
}
)
const Camion = mongoose.model('Camion', camionSchema)
export default Camion
