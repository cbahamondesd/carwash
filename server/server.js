import express from "express"; 
import cors from "cors";
import carwashConnect from './config/mongoose.config.js';
import * as ordenRoutes from "./routes/orden.routes.js"; 
import * as funcionarioRoutes from "./routes/funcionario.routes.js"; 

const app = express(); 
const port = 8000;

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cors()); 

carwashConnect();

app.use(ordenRoutes.ordenRouter);
app.use(funcionarioRoutes.funcionarioRouter);

app.listen(port, () => {
    console.log(`El servidor está activo en el puerto ${port}`);
});