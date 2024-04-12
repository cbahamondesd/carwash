import Cliente from "../models/cliente.model.js";

//Create
const createCliente = async (req, res) => {
    try {
        let data = req.body;
        let newData = await Cliente.create(data);
        res.status(200).json(newData);
    }
    catch (error) {
        console.log("Error" + error.message);
        res.status(400).json({
            message: "Por favor, complete los campos requeridos."
        });
    }
}

//Get All
const getAllClientes = async (req, res) => {
    try {
        let list = await Cliente.find().sort({ clienteType: 1 }).exec();
        res.status(200).json(list);
    } catch (error) {
        console.log("Error" + error.message);
        res.status(400).json({
            message: error.message
        });
    }
};

// Get by id
const getClienteById = async (req, res) => {
    try {
        let id = req.params.id;
        let found = await Cliente.findById(id);
        res.status(200).json(found)
    } catch (error) {
        console.log("Error" + error.message);
        res.status(400).json({
            message: error.message
        });
    }
};

//Update
const updateCliente = async (req, res) => {
    try {
        let id = req.params.id;
        let data = req.body;
        await Cliente.findByIdAndUpdate(id, data, { runValidators: true });
        res.status(200).json();
    } catch (error) {
        console.log("Error" + error);
        res.status(400).json({
            message: error.message,
        });
    }
};

//Delete
const deleteCliente = async (req, res) => {
    try {
        let id = req.params.id;
        await Cliente.findByIdAndDelete(id);
        res.status(200).json();
    } catch (error) {
        console.log("Error" + error);
        res.status(400).json({
            error: "No hemos podido borrar los datos del cliente. Por favor, inténtelo de nuevo.",
        });
    }
};

export { createCliente, getAllClientes, getClienteById, updateCliente, deleteCliente };