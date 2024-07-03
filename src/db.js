import mongoose from 'mongoose'

export const connectDB= async ()=> {
    try {
        await mongoose.connect('mongodb+srv://yanezgael576:123@cluster0.hbqd1wx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log('Conexion exitosa')
    } catch (error) {
      console.error(error)
    }
}
