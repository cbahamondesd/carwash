const Servicio = require('../models/servicio.model');

//CREATE
module.exports.createServicio = async (req, res) => {
    try {
        let data = req.body;
        let newData = await Servicio.create(data);
        res.status(200).json(newData);
    } catch (error) {
        console.log("Error" + error.message);
        res.status(400).json({
        message: "Por favor completa los campos requeridos.",
        });
    }
};

// GET ALL
module.exports.getAllServicios = async (req, res) => {
    try {
        let list = await Servicio.find().sort({ servicioType: 1 }).exec();
        res.status(200).json(list);
    } catch (error) {
        console.log("Error" + error.message);
        res.status(400).json({
        message: error.message,
        });
    }
};

// GET BY ID
module.exports.getServicioById = async (req, res) => {
    try {
        let id = req.params.id;
        let found = await Servicio.findById(id);
        res.status(200).json(found);
    } catch (error) {
        console.log("Error" + error.message);
        res.status(400).json({
        message: error.message,
        });
    }
};

//UPDATE
module.exports.updateServicio = async (req, res) => {
    try {
        let id = req.params.id;
        let data = req.body;
        await Servicio.findByIdAndUpdate(id, data, { runValidators: true });
        res.status(200).json();
    } catch (error) {
        console.log("Error" + error);
        res.status(400).json({
        message: error.message,
        });
    }
};

//DELETE
module.exports.deleteServicio = async (req, res) => {
    try {
        let id = req.params.id;
        await Servicio.findByIdAndDelete(id);
        res.status(200).json();
    } catch (error) {
        console.log("Error" + error);
        res.status(400).json({
        error: "No hemos podido eliminar este servicio de la base de datos. Por favor inténtalo de nuevo.",});
    }
};

