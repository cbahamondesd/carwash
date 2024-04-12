import express from "express";
import * as ordenCtrl from "../controllers/orden.controller.js";

const ordenRouter = express.Router();

ordenRouter.post("/api/orden/new", ordenCtrl.createOrden);
ordenRouter.get("/api/orden/get", ordenCtrl.getAllOrdenes);
ordenRouter.get("/api/orden/get/:id", ordenCtrl.getOrdenById);
ordenRouter.put("/api/orden/update/:id", ordenCtrl.updateOrden);
ordenRouter.delete("/api/orden/delete/:id", ordenCtrl.deleteOrden);

export { ordenRouter };
