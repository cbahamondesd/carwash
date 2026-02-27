import Cliente from "../models/cliente.model.js";

const createCliente = async (req, res) => {
    try {
        let data = { ...req.body, creadoPor: req.user.id};
        let newData = await Cliente.create(data);
        res.status(200).json(newData);
    }
    catch (error) {
        console.log("Error" + error.message);
        res.status(400).json({
            message: error.message
        });
    }
}

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