import mongoose from 'mongoose'

export const connectDB= async ()=> {
    try {
        await mongoose.connect('mongodb+srv://yanezgael576:2hps8WoTVTJrIJ8K@utd.pha0z.mongodb.net/?retryWrites=true&w=majority&appName=utd');
        console.log('Conexion exitosa')
    } catch (error) {
      console.error(error)
    }
}
