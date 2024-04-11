const servicioCtrl = require('../controllers/servicio.controller');

module.exports = function(app){

    app.post("/api/servicio/new", servicioCtrl.createServicio);
    app.get("/api/servicio/", servicioCtrl.getAllServicios);
    app.get("/api/servicio/:id", servicioCtrl.getServicioById);
    app.put("/api/servicio/update/:id", servicioCtrl.updateServicio);
    app.delete("/api/servicio/delete/:id", servicioCtrl.deleteServicio);
}