import express from "express";
import * as funcionarioCtrl from "../controllers/funcionario.controller.js";

const funcionarioRouter = express.Router();

funcionarioRouter.post("/api/personal/new", funcionarioCtrl.createfuncionario);
funcionarioRouter.get("/api/personal/get", funcionarioCtrl.getAllfuncionarios);
funcionarioRouter.get("/api/personal/get/:id", funcionarioCtrl.getfuncionarioById);
funcionarioRouter.put("/api/personal/update/:id", funcionarioCtrl.updatefuncionario);
funcionarioRouter.delete("/api/personal/delete/:id", funcionarioCtrl.deletefuncionario);

export { funcionarioRouter };
