import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRoutes from './routes/auth.routes.js'
import docsRoutes from './routes/docs.routes.js'
import conductoresRoutes from './routes/conductor.routes.js'
const app = express()

app.use(cors({
    origin:'http://localhost:5173'
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser())

app.use('/api',authRoutes);
app.use('/api',docsRoutes);
app.use('/api',conductoresRoutes);

export default app;