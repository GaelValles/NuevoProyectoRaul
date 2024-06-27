import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from './routes/auth.routes.js';
import conductorRoutes from "./routes/conductor.routes.js";
import permisoRoutes from "./routes/permiso.routes.js";

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(authRoutes);
app.use(conductorRoutes);
app.use(permisoRoutes);

export default app;
