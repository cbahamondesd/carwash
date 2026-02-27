import express from 'express';
import * as servicioCtrl from '../controllers/servicio.controller.js';

const servicioRouter = express.Router();

servicioRouter.post("/api/servicio", servicioCtrl.createServicio);
servicioRouter.get("/api/servicio/", servicioCtrl.getAllServicios);
servicioRouter.get("/api/servicio/:id", servicioCtrl.getServicioById);
servicioRouter.put("/api/servicio/:id", servicioCtrl.updateServicio);
servicioRouter.delete("/api/servicio/:id", servicioCtrl.deleteServicio);

export { servicioRouter };
