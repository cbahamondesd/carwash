import express from "express";
import * as funcionarioCtrl from "../controllers/funcionario.controller.js";

const funcionarioRouter = express.Router();

funcionarioRouter.post("/api/personal/new", funcionarioCtrl.createFuncionario);
funcionarioRouter.get("/api/personal/get", funcionarioCtrl.getAllFuncionarios);
funcionarioRouter.get("/api/personal/get/:id", funcionarioCtrl.getFuncionarioById);
funcionarioRouter.put("/api/personal/update/:id", funcionarioCtrl.updateFuncionario);
funcionarioRouter.delete("/api/personal/delete/:id", funcionarioCtrl.deleteFuncionario);

export { funcionarioRouter };
