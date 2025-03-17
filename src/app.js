import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import authRoutes from './routes/auth.routes.js';
import profesorRoutes from "./routes/profesor.routes.js";
import alumnosRoutes from "./routes/alumnos.routes.js";
import materiasRoutes from "./routes/materias.routes.js";
const app = express();

app.use(cors({
      origin:'http://localhost:5173',
  credentials:true
}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(authRoutes);
app.use(profesorRoutes);
app.use(alumnosRoutes);
app.use(materiasRoutes);


export default app;
