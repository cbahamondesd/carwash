import express from "express"; 
import cors from "cors";
import carwashConnect from './config/mongoose.config.js';
import * as ordenRoutes from "./routes/orden.routes.js"; 
import * as authRoutes from "./routes/auth.routes.js";
import * as clienteRoutes from "./routes/cliente.routes.js";
import * as servicioRoutes from "./routes/servicio.routes.js";

const app = express(); 
const port = 8000;

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cors()); 

carwashConnect();

app.use(ordenRoutes.ordenRouter);
app.use(authRoutes.authRouter);
app.use(clienteRoutes.clienteRouter);
app.use(servicioRoutes.servicioRouter);

app.listen(port, () => {
    console.log(`El servidor está activo en el puerto ${port}`);
});