import express from "express";
import * as clienteCtrl from "../controllers/cliente.controller.js";
import { authRequired } from "../middleware/auth.middleware.js";

const clienteRouter = express.Router();

clienteRouter.post("/api/cliente", authRequired, clienteCtrl.createCliente);
clienteRouter.get("/api/cliente", authRequired, clienteCtrl.getAllClientes);
clienteRouter.get("/api/cliente/:id", authRequired, clienteCtrl.getClienteById);
clienteRouter.put("/api/cliente/:id", authRequired, clienteCtrl.updateCliente);
clienteRouter.delete("/api/cliente/:id", authRequired, clienteCtrl.deleteCliente);

export { clienteRouter };