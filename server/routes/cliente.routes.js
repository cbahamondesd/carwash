import express from "express";
import * as clienteCtrl from "../controllers/cliente.controller.js";

const clienteRouter = express.Router();

clienteRouter.post("/api/cliente/new", clienteCtrl.createCliente);
clienteRouter.get("/api/cliente/get", clienteCtrl.getAllClientes);
clienteRouter.get("/api/cliente/get/:id", clienteCtrl.getClienteById);
clienteRouter.put("/api/cliente/update/:id", clienteCtrl.updateCliente);
clienteRouter.delete("/api/cliente/delete/:id", clienteCtrl.deleteCliente);

export { clienteRouter };