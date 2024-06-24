import mongoose from 'mongoose'

export async function connectDB() {
    try {
        await mongoose.connect('mongodb+srv://yanezgael576:123@lugacluster.puuwo4l.mongodb.net/?retryWrites=true&w=majority&appName=LugaCluster')
        console.log('Conexion exitosa')
    } catch (error) {
      console.error(error)
    }
}
