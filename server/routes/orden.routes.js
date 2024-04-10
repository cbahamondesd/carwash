import express from "express";
import * as ordenCtrl from "../controllers/orden.controller.js";

const ordenRouter = express.Router();

ordenRouter.post("/api/orden/new", ordenCtrl.createorden);
ordenRouter.get("/api/orden/get", ordenCtrl.getAllordens);
ordenRouter.get("/api/orden/get/:id", ordenCtrl.getordenById);
ordenRouter.put("/api/orden/update/:id", ordenCtrl.updateorden);
ordenRouter.delete("/api/orden/delete/:id", ordenCtrl.deleteorden);

export { ordenRouter };
