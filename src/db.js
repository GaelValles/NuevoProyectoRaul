import mongoose from 'mongoose'

export const connectDB= async ()=> {
    try {
        await mongoose.connect('mongodb+srv://monica:monica123@utd.pha0z.mongodb.net/?retryWrites=true&w=majority&appName=utd');
        console.log('Conexion exitosa')
    } catch (error) {
      console.error(error)
    }
}
