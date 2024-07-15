import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import authRoutes from './routes/auth.routes.js';
import conductorRoutes from "./routes/conductor.routes.js";
import permisoRoutes from "./routes/permiso.routes.js";
import camionRoutes from "./routes/camion.routes.js";
import cajaRoutes from "./routes/caja.routes.js";
import './services/cronService.js'; 
const app = express();

app.use(cors({
      origin:'https://estadialuga-frontend.onrender.com',
  credentials:true
}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(authRoutes);
app.use(conductorRoutes);
app.use(permisoRoutes);
app.use(camionRoutes);
app.use(cajaRoutes);

export default app;
